import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { CloseEventType, DialogService } from '~shared/dialog';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	pending = true;
	/** total number of items */
	total$: Observable<number>;
	/** number of items taken at once */
	private limit$ = new BehaviorSubject(25);
	filteredItems$ = combineLatest(
		this.filterSrv.valueChanges$,
		this.limit$
	).pipe(
		// gets the query
		map(([{ queryArg }, limit]) => this.apiSrv.search<G>(
			this.typename, { filter: queryArg, limit })
		),
		// save it
		tap(query => this.queryRef = query),
		tap(query => this.total$ = query.total$),
		// return the result
		switchMap(_ => this.queryRef.data$),
		// setting pending to false because we received data
		tap(_ => this.pending = false),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	refetch(options?: WatchQueryOptions) {
		this.pending = true;
		return this.queryRef.refetch({ ...options, fetchPolicy: 'network-only' })
		.then(_ => this.pending = false);
	}

	create() {
		this.dlgSrv.open(CreationDialogComponent ,this.typename).pipe(
			filter(closeEvent => closeEvent.type === CloseEventType.OK),
			map(closeEvent => closeEvent.data),
			switchMap(entity => this.apiSrv.create(this.typename, entity)),
			tap(created => this.apiSrv.addToList(this.queryRef, created))
		);
	}

	update(entity: any) {
		this.apiSrv.update(this.typename, entity);
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(ent => this.apiSrv.update(this.typename, { id: ent.id, ...entity}));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	delete(entity: any) {
		debugger;
		this.apiSrv.delete(this.typename, entity).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	deleteSelected() {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	setItemsPerPage(value: number) {
		this.limit$.next(value);
	}

	loadMore() {
		throw Error('not implemented yet');
	}

	loadPage() {
		throw Error('not implemented yet');
	}

	loadNextPage() {
		throw Error('not implemented yet');
	}

	loadPreviousPage() {
		throw Error('not implemented yet');
	}

	loadFirstPage() {
		throw Error('not implemented yet');
	}

	loadLastPage() {
		throw Error('not implemented yet');
	}

	/** Sorts items based on sort.sortBy */
	sort() {
		throw Error('not implemented');
	}

}

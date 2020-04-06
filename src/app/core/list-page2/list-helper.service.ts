import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap, mergeMap } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { CloseEventType, DialogService } from '~shared/dialog';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from './selection.service';
import { TeamService } from '~core/auth';
import { PaginationService } from '~shared/pagination/services/pagination.service';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private _pending$ = new BehaviorSubject<boolean>(true);
	pending$ = this._pending$.asObservable();
	private _total$ = new BehaviorSubject(0);
	total$ = this._total$.asObservable();
	/** the filtered items */
	filteredItems$ = combineLatest(
		this.filterSrv.valueChanges$,
		this.paginationSrv.page$,
		this.paginationSrv.limit$,
		this.sortSrv.sort$
	).pipe(
		// gets the query
		map(([{ queryArg }, page, limit, sort]) => {
			return this.apiSrv.search<G>(
				this.typename, {
					filter: queryArg,
					limit,
					from: page * limit,
					sort
				}, {});
			}
		),
		// save it
		tap(query => this.queryRef = query),
		mergeMap(query => query.total$),
		tap(total => this._total$.next(total)),
		// add total to the paginationSrv
		tap(total => this.paginationSrv.setupTotal(total)),
		// add the next token for infiniscroll
		// TODO
		// return the result
		switchMap(_ => this.queryRef.data$),
		// setting pending to false because we received data
		tap(_ => this._pending$.next(false)),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private sortSrv: SortService,
		private paginationSrv: PaginationService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService,
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	refetch(options?: WatchQueryOptions) {
		this._pending$.next(true);
		return this.queryRef.refetch({ ...options, fetchPolicy: 'network-only' })
		.then(_ => this._pending$.next(false));
	}

	create(addedProperties: any) {
		this.dlgSrv.open(CreationDialogComponent , {
			typename: this.typename,
			extra: addedProperties
		}).pipe(
			filter(closeEvent => closeEvent.type === CloseEventType.OK),
			map(closeEvent => closeEvent.data),
			switchMap(entity => this.apiSrv.create(this.typename, entity)),
		).subscribe(created => this.apiSrv.addToList(this.queryRef, created));
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

	loadMore() {
		throw Error('not implemented yet');
	}

}

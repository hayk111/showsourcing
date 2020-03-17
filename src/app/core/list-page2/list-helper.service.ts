import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {

	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	pending = true;
	total$: Observable<number>;
	/** number of items taken at once */
	private limit$ = new BehaviorSubject(25);

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	getFilteredItems$() {
		return combineLatest(
			this.filterSrv.valueChanges$,
			this.limit$).pipe(
			// gets the query
			map(([{ queryArg: filter }, limit]) => this.apiSrv.search<G>(
				this.typename, { filter, limit })
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
	}

	private refetch(options?: WatchQueryOptions) {
		this.pending = true;
		return this.queryRef.refetch({ ...options, fetchPolicy: 'network-only' })
		.then(_ => this.pending = false);
	}

	create(entity: any) {
		this.apiSrv.create(this.typename, entity).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	update(entity: any) {
		this.apiSrv.update(this.typename, entity);
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

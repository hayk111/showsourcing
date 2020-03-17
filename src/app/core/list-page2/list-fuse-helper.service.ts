import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import * as Fuse from 'fuse.js';
import { forkJoin, Observable, of } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { ApiService, ObservableQuery, ApiQueryOption } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterType } from '~core/filters';
import { FilterService } from '~core/filters';
import { SelectionService } from './selection.service';

@Injectable({ providedIn: 'root' })
export class ListFuseHelperService<G = any> {
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private fuse: any;
	pending = true;
	total$: Observable<number>;

	fuseOptions = {
		keys: ['name'],
		shouldSort: true,
		includeScore: true,
		threshold: 0.9,
		location: 0,
		distance: 100,
		minMatchCharLength: 1
	};

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(
		typename: Typename,
		byTypename: Typename | 'Owner',
		byId: string,
		queryOptions: ApiQueryOption = {}
	) {
		this.typename = typename;
		queryOptions.fetchPolicy = queryOptions.fetchPolicy || 'cache-first';
		this.queryRef = this.apiSrv.listBy<G>(typename, byTypename, byId, queryOptions);
		this.fuseOptions.keys = this.filterSrv.searchedFields || this.fuseOptions.keys;
		// when we update datas it will reasign fuse
		this.queryRef.data$.subscribe(datas => {
			this.fuse = new Fuse(datas, this.fuseOptions);
		});
	}

	getFilteredItems$(): Observable<G[]> {
		return this.filterSrv.valueChanges$.pipe(
			// the value changed should concern the FilterType search
			filter(() => !!this.fuse),
			switchMap(() => {
				const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
				if (searchValue) return of(this.fuse.search(searchValue.value).map(data => data.item));
				else return this.queryRef.data$;
			}),
			shareReplay(1)
		);
		// result.sort(); // TODO should take sort property from filterSrv, not implemented yet
		// TODO should trigger getFilteredItems$() when sort is updated
		// TODO update pagination
	}

	private refetch() {
		this.pending = true;
		return this.queryRef.refetch({ fetchPolicy: 'cache-first' }).then(_ => (this.pending = false));
	}

	create(entity: any) {
		this.apiSrv
			.create(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	update(entity: any) {
		this.apiSrv.update(this.typename, entity);
	}

	delete(entity: any) {
		this.apiSrv
			.delete(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	deleteSelected() {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		forkJoin(all)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
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

import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { FilterService } from '~core/filters/filter.service';
import * as Fuse from 'fuse.js';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { forkJoin, Observable, from } from 'rxjs';
import { Typename } from '~core/erm3/typename.type';
import * as models from '~core/erm3/models';
import gql from 'graphql-tag';
import { FilterType } from '~core/filters';
import { FetchPolicy } from 'apollo-client';
import { DocumentNode } from 'graphql';

@Injectable({ providedIn: 'root' })
export class ListFuseHelperService<G = any> {
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private fuse: any;
	pending = true;
	total$: Observable<number>;

	fuseOptions = {
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
		keys: ['name']
	};

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(typename: Typename, query: DocumentNode, variables?, searchedFields?: string[]) {
		/** this query is custom to test how is working the helper. It should be listBy
		 *  cache-and-network for the first query to get the up to date datas
		 */
		this.typename = typename;
		this.queryRef = this.apiSrv.query<G[]>({ variables, query, fetchPolicy: 'cache-and-network' });
		this.fuseOptions.keys = searchedFields || this.fuseOptions.keys; // ? could be take from filterSrv ?
		// when we refetch and get new datas it will reasign fuse
		this.queryRef.data$.subscribe(datas => {
			this.fuse = new Fuse(datas, this.fuseOptions);
		});
	}

	getFilteredItems$(): Observable<G[]> {
		return this.filterSrv.valueChanges$.pipe(
			// the value changed should concern the FilterType search
			map(() => this.fuse.search(this.filterSrv.getFiltersForType(FilterType.SEARCH))),
			shareReplay(1)
		);
		// result.sort(); // ? should take sort property from filterSrv, not implemented yet
		// ? should trigger getFilteredItems$() when sort is updated
		// ? update pagination
	}

	private refetch(fetchPolicy: FetchPolicy = 'network-only') {
		this.pending = true;
		return this.queryRef.refetch({ fetchPolicy }).then(_ => (this.pending = false));
	}

	create(entity: any) {
		this.apiSrv
			.create(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	update(entity: any) {
		this.apiSrv
			.update(this.typename, entity)
			.pipe(switchMap(_ => this.refetch('cache-first')))
			.subscribe();
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

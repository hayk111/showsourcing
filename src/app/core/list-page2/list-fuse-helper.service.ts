import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { FilterService } from '~core/filters/filter.service';
import { switchMap, tap, map, shareReplay } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { Typename } from '~core/erm3/typename.type';
import * as models from '~core/erm3/models';


@Injectable({ providedIn: 'root' })
export class ListFuseHelperService<G = any> {

	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	pending = true;
	total$: Observable<number>;

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(typename: Typename, byTypename: Typename | 'Owner', byId: string) {
		// TODO query with listBy/cache-first for setup the helper and be able to refetch: we need typename and byTypename and byId
		// TODO initialize Fuse to have 'allItems' ready to search
	}

	getFilteredItems$() {
		// TODO use filterSrv to search with fuse on allItems
	}

	private refetch() {
		// TODO refetch the query and reinitialise Fuse
		// this.pending = true;
		// return this.queryRef.refetch({ fetchPolicy: 'network-only' })
		// .then(_ => this.pending = false);
	}

	create(entity: any) {
		// TODO create entity and refetch network-only
		// this.apiSrv.create(this.typename, entity).pipe(
		// 	switchMap(_ => this.refetch())
		// ).subscribe();
	}

	update(entity: any) {
		// TODO update entity and refetch in cache-first !
		// this.apiSrv.update(this.typename, entity);
	}

	delete(entity: any) {
		// TODO delete entity and refetch network-only
		// this.apiSrv.delete(this.typename, entity).pipe(
		// 	switchMap(_ => this.refetch())
		// ).subscribe();
	}

	deleteSelected() {
		// ? same behavior
		// const selected = this.selectionSrv.getSelectedValues();
		// const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		// forkJoin(all).pipe(
		// 	switchMap(_ => this.refetch())
		// ).subscribe();
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

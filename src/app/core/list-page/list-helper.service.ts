import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { FilterService } from '~core/filters/filter.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Typename } from '~core/erm3/typename.type';


@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {

	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	pending = true;

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	getFilteredItems$() {
		return this.filterSrv.valueChanges$.pipe(
			// gets the query
			map(({ queryArg: filter }) => this.apiSrv.search<G>(this.typename, { filter })),
			// save it
			tap(query => this.queryRef = query),
			// return the result
			switchMap(_ => this.queryRef.data$),
			// setting pending to false because we received data
			tap(_ => this.pending = false),
		);
	}

	private refetch() {
		this.pending = true;
		return this.queryRef.refetch({ fetchPolicy: 'network-only' })
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

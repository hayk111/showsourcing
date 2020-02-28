import { Injectable } from '@angular/core';
import { SelectionService } from './selection.service';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { FilterService } from '~core/filters/filter.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { EntityName, Entity } from '~core/erm';



interface ListHelper {
	pending: any;
	update: any;
	updateSelected: any;
	create: any;
	delete: any;
	deleteSelected: any;
	loadPage: any;
	loadNextPage: any;
	loadPreviousPage: any;
	loadFirstPage: any;
	loadLastPage: any;
	sort: any;
}

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {

	private queryRef: ObservableQuery<G[]>;
	private entityName: EntityName;
	pending = true;

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(entityName: EntityName) {
		this.entityName = entityName;
	}

	getFilteredItems$() {
		return this.filterSrv.valueChanges$.pipe(
			// gets the query
			map(({ queryArg }) => this.apiSrv.queryMany<G>(this.entityName, queryArg)),
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

	create(entity: Entity) {
		this.apiSrv.create(this.entityName, entity).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	update(entity: Entity) {
		this.apiSrv.update(this.entityName, entity);
	}

	delete(entity: Entity) {
		this.apiSrv;
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

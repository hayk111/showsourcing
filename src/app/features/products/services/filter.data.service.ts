import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import { Supplier } from '~models';

import { FilterDataQueries } from './filter.data.queries';

@Injectable()
export class FilterDataService {

	constructor(private apollo: Apollo) { }

    selectSuppliers(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.suppliers }).pipe(
			map(r => r.data.suppliers)
		);
    }

    selectEvents(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.events }).pipe(
			map(r => r.data.events)
		);
    }

    selectCategories(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.categories }).pipe(
			map(r => r.data.events)
		);
    }

    selectTags(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.tags }).pipe(
			map(r => r.data.tags)
		);
    }

    selectProjects(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.projects }).pipe(
			map(r => r.data.projects)
		);
    }

    selectCreatedBy(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.createdBy }).pipe(
			map(r => r.data.events)
		);
    }

    selectStatuses(): Observable<Supplier[]> {
		return this.apollo.subscribe({ query: FilterDataQueries.statuses }).pipe(
			map(r => r.data.status)
		);
    }

    // favorite
}

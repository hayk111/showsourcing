import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Supplier } from '~models';
import { ApolloClient } from '~shared/apollo';

import { SupplierQueries } from './supplier.queries';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { SortEvent } from '~shared/table/components/sort-event.interface';
import { PER_PAGE } from '~utils';

@Injectable()
export class SupplierService implements GlobalServiceInterface<Supplier> {
	queries = new SupplierQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Supplier> {
		return this.apollo.selectOne({ gql: this.queries.one, id })
			.pipe(
				map((r: any) => r.data.suppliers ? r.data.suppliers[0] : undefined)
			);
	}

	selectMany(
		page$: Observable<number>,
		query$: Observable<string>,
		sort$: Observable<SortEvent>
	): Observable<Supplier[]> {
		throw Error('not implemented yet')
	}

	selectAll(fields: string = `id, name`) {
		return this.apollo.selectMany({
			gql: this.queries.all(fields),
		}).pipe(
			map((r: any) => r.data.suppliers ? r.data.suppliers[0] : undefined)
		);
	}

	update(supplier: Supplier) {
		return this.apollo.update({
			gql: this.queries.update,
			input: supplier,
			typename: 'Supplier'
		}).pipe(
			take(1),
		);
	}

	create(supplier: Supplier) {
		return this.apollo.create({
			gql: this.queries.create,
			input: supplier,
			typename: 'Supplier'
		}).pipe(
			take(1),
			map((r: any) => r.data.addSupplier.id)
		);
	}

	delete(supplier: Supplier) {
		return this.apollo.create({
			gql: this.queries.delete,
			input: supplier.id,
			typename: 'Supplier'
		}).pipe(
			take(1)
		);
	}

	deleteMany(suppliers: Supplier[]) {
		let query = suppliers.reduce((prev, curr) => `${prev} OR id == "${curr.id}"`, '');
		// removing the first ' OR'
		query = query.substr(2);
		return this.apollo.create({
			gql: this.queries.delete,
			input: query,
			typename: 'Supplier'
		}).pipe(
			take(1)
		);
	}

}


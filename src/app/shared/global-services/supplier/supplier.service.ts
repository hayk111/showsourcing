import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Supplier } from '~models';
import { ApolloClient } from '~shared/apollo';

import { SupplierQueries } from './supplier.queries';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';

@Injectable()
export class SupplierService implements GlobalServiceInterface<Supplier> {
	queries = new SupplierQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Supplier> {
		return this.apollo.subscribe({
			query: this.queries.one,
			variables: { query: `id == '${id}'` }
		}).pipe(
			map((r: any) => r.data.suppliers ? r.data.suppliers[0] : undefined)
		);
	}

	// TODO Thierry
	// selectList() {}

	selectAll(fields: string = `id, name`) {
		return this.apollo.subscribe({
			query: this.queries.all(fields),
		}).pipe(
			map((r: any) => r.data.suppliers ? r.data.suppliers[0] : undefined)
		);
	}

	update(supplier: Supplier) {
		return this.apollo.update({
			mutation: this.queries.update,
			input: supplier,
			typename: 'Supplier'
		}).pipe(
			take(1),
		);
	}

	create(supplier: Supplier) {
		return this.apollo.create({
			mutation: this.queries.create,
			input: supplier,
			typename: 'Supplier'
		}).pipe(
			take(1),
			map((r: any) => r.data.addSupplier.id)
		);
	}

	delete(supplier: Supplier) {
		return this.apollo.create({
			mutation: this.queries.delete,
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
			mutation: this.queries.delete,
			input: query,
			typename: 'Supplier'
		}).pipe(
			take(1)
		);
	}

}


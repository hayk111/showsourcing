import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { SupplierQueries } from './supplier.queries';
import { Supplier } from '~models';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';


@Injectable()
export class SupplierService implements GlobalServiceInterface<Supplier> {

	queries = new SupplierQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Supplier> {
		throw Error('not implemented yet');
	}

	selectAll(fields: string) {
		return this.apollo.subscribe({
			query: this.queries.all(fields)
		}).pipe(map(({ data }) => (<any>data).suppliers));
	}

	update(supplier: Supplier): Observable<Supplier> {
		return this.apollo.update({
			mutation: this.queries.update,
			input: supplier,
			typename: 'Supplier'
		}).pipe(map(({ data }) => (<any>data).suppliers));
	}

	create(supplier: Supplier): Observable<Supplier> {
		return this.apollo.create({ mutation: this.queries.create, input: supplier, typename: 'Supplier' })
			.pipe(
				map((r: any) => r.data.addSupplier.id)
			);
	}

	delete(supplier: Supplier) {
		return this.apollo.delete({ mutation: this.queries.delete, input: supplier.id, typename: 'Supplier' }).pipe(first());
	}

	deleteMany(suppliers: Supplier[]) {
		return null;
	}

}


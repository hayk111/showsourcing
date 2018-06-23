import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SupplierType } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '../_interfaces/global.service';

import { SupplierTypeQueries } from './supplier-type.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService implements GlobalServiceInterface<SupplierType> {
	queries = new SupplierTypeQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<SupplierType> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<SupplierType[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.supplierTypes)
		);
	}

	update(status: SupplierType): Observable<SupplierType> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'SupplierType'
		}).pipe(
			first(),
			map(({ data }) => data.updateSupplierType)
		);
	}

	create(status: SupplierType): Observable<SupplierType> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'SupplierType'
		}).pipe(
			first(),
			map(({ data }) => data.createSupplierType)
		);
	}

	delete(supplierType: SupplierType): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(supplierType: SupplierType[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

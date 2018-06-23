import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ProductStatus } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '../_interfaces/global.service';

import { ProductStatusQueries } from './product-status.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService implements GlobalServiceInterface<ProductStatus> {
	queries = new ProductStatusQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<ProductStatus> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<ProductStatus[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.productStatuses)
		);
	}

	update(status: ProductStatus): Observable<ProductStatus> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'ProductStatus'
		}).pipe(
			first(),
			map(({ data }) => data.updateProductStatus)
		);
	}

	create(status: ProductStatus): Observable<ProductStatus> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status
		}).pipe(
			first(),
			map(({ data }) => data.updateProductStatus)
		);
	}

	delete(status: ProductStatus): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(status: ProductStatus[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

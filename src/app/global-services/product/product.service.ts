import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants/data.const';

import { GlobalServiceInterface } from '../_interfaces/global.service';
import { ProductQueries } from './product.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductService implements GlobalServiceInterface<Product> {
	queries = new ProductQueries();
	private take = 30;

	constructor(private apollo: ApolloClient) {

	}

	selectOne(id: string): Observable<Product> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectMany(page$: any, query$: any, sort$: any) {
		return combineLatest(page$, query$, sort$).pipe(
			map(res => ({
				// assigning default values in case none have been specified
				page: res[0] || 0,
				query: res[1] || '',
				sort: res[2] || {}
			})),
			// we start with this
			startWith({ page: 0, sort: {}, query: '' }),
			switchMap((opt: any) => {
				return this.apollo.selectMany({
					gql: this.queries.list,
					skip: opt.page * PER_PAGE,
					take: PER_PAGE,
					sortBy: opt.sort.sortBy,
					descending: opt.sort.sortOrder === 'ASC',
					query: opt.query
				});
			}),
			map(({ data }) => data.products)
		);
	}

	selectAll(fields: string = 'id, name'): Observable<Product[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.products)
		);
	}

	update(product: Product): Observable<Product> {
		return this.apollo.update({
			gql: this.queries.update,
			input: product,
			typename: 'Supplier'
		}).pipe(
			first(),
			map(({ data }) => data.updateSupplier)
		);
	}

	create(product: Product): Observable<Product> {
		return this.apollo.create({
			gql: this.queries.create,
			input: product
		}).pipe(
			first(),
			map(({ data }) => data.updateSupplier)
		);
	}

	delete(product: Product): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(product: Product[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

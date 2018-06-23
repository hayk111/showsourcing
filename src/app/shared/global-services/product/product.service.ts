import { Injectable } from '@angular/core';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { Observable, combineLatest } from 'rxjs';
import { ProductQueries } from '~shared/global-services/product/product.queries';
import { switchMap, map, first, startWith, tap } from 'rxjs/operators';
import { PER_PAGE } from '~utils/constants/data.const';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';


@Injectable({
	providedIn: 'root'
})
export class ProductService implements GlobalServiceInterface<Product> {
	queries = new ProductQueries();
	private take = 30;

	constructor(private apollo: ApolloClient) {

	}

	selectOne(id: string): Observable<Product> {
		return this.apollo.subscribe({ query: this.queries.one });
	}

	selectList(page$: any, filters$: any, sort$: any) {
		return combineLatest(page$, filters$, sort$).pipe(
			map(res => ({
				// assigning default values in case none have been specified
				page: res[0] || 0,
				query: res[1] || '',
				sort: res[2] || {}
			})),
			// we start with this
			startWith({ page: 0, sort: {}, query: '' }),
			switchMap((opt: any) => {
				return this.apollo.subscribe({
					query: this.queries.list,
					variables: {
						skip: opt.page * PER_PAGE,
						take: PER_PAGE,
						sortBy: opt.sort.sortBy,
						descending: opt.sort.sortOrder === 'ASC',
						query: opt.query
					}
				});
			}),
			map(({ data }) => data.products)
		);
	}

	selectAll(fields: string = 'id, name'): Observable<Product[]> {
		return this.apollo.subscribe({ query: this.queries.all(fields) }).pipe(
			map(({ data }) => data.products)
		);
	}
	update(product: Product): Observable<Product> {
		return this.apollo.update({
			mutation: this.queries.update,
			input: product,
			typename: 'Supplier'
		}).pipe(
			first(),
			map(({ data }) => data.updateSupplier)
		);
	}

	create(product: Product): Observable<Product> {
		return this.apollo.create({
			mutation: this.queries.create,
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

import { Injectable } from '@angular/core';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { Observable, combineLatest } from 'rxjs';
import { ProductQueries } from '~shared/global-services/product/product.queries';
import { switchMap, map, first } from 'rxjs/operators';
import { PER_PAGE } from '~utils/constants/data.const';


@Injectable()
export class ProductService implements GlobalServiceInterface<Product> {
	queries = new ProductQueries();
	private take = 30;

	constructor(private apollo: ApolloClient) {

	}

	selectOne(id: string): Observable<Product> {
		return this.apollo.subscribe({ query: this.queries.one });
	}

	selectList(page$: any, filters$: any, sort$: any) {
		combineLatest(page$, filters$, sort$).pipe(
			switchMap(([page, filters, sort]) => {
				return this.apollo.subscribe({
					query: this.queries.list,
					variables: {
						skip: page * PER_PAGE,
						take: PER_PAGE,
						sortBy: sort.sortBy,
						descending: sort.sortOrder === 'ASC',
						// query: this.createQueryFromFilters(filtergroup)
					}
				});
			})
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

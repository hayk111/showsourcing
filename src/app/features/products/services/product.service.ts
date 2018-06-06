import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product, Project } from '~models';
import { ProductQueries } from '~features/products/services/product.queries';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { take, map, filter, first } from 'rxjs/operators';
import { ApolloClient } from '~shared/apollo';

import { PER_PAGE } from '~utils/constants';

@Injectable()
export class ProductService {
	private productsQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		products.
	 */
	private initializeProductQuery() {
		if (!this.productsQuery$) {
			this.productsQuery$ = this.apollo.query<any>({
				query: ProductQueries.list,
				variables: {
					query: '',
					skip: 0,
					take: PER_PAGE,
					sortBy: 'name',
					descending: true
				}
			});
		}
	}

	/*
		Initialize the underlying query ref for the list of
		products.
	 */
	selectProducts(): Observable<Product[]> {
		this.initializeProductQuery();
		return this.productsQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).products),
		);
	}

	/*
		Triggers the load of a page of products based on
		a page number.

		This method returns a observable to register on to be
		notified when the processing ends.
	 */
	loadProductsNextPage({ page, sort, filtergroup }) {
		this.initializeProductQuery();
		return fromPromise(this.productsQuery$.fetchMore({
			variables: sort ? {
				skip: page * PER_PAGE,
				take: PER_PAGE,
				query: this.createQueryFromFilters(filtergroup),
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'ASC'
			} : {
				skip: page * PER_PAGE,
				take: PER_PAGE,
				query: this.createQueryFromFilters(filtergroup),
				sortBy: 'name',
				descending: true
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) { return prev; }
				return {
					...prev,
					products: [...prev.products, ...fetchMoreResult.products],
				};
			}
		})).pipe(first());
	}

	/*
		Sorts the products data for a specified column.

		This method returns a observable to register on to be
		notified when the processing ends.
	 */
	sortProducts({ sort, filtergroup }) {
		this.initializeProductQuery();
		return fromPromise(this.productsQuery$.refetch({
			skip: 0,
			take: PER_PAGE,
			sortBy: sort.sortBy,
			descending: sort.sortOrder === 'ASC',
			query: this.createQueryFromFilters(filtergroup)
		})).pipe(first());
	}

	/*
		Filter the products data for a specified filter group.

		This method returns an observable to register on to be
		notified when the processing ends.
	 */
	filterProducts({ filtergroup, sort }) {
		this.initializeProductQuery();
		return fromPromise(this.productsQuery$.refetch(sort ? {
			skip: 0,
			take: PER_PAGE,
			query: this.createQueryFromFilters(filtergroup),
			sortBy: 'name',
			descending: true
		} : {
			skip: 0,
			take: PER_PAGE,
			query: this.createQueryFromFilters(filtergroup),
			sortBy: sort.sortBy,
			descending: sort.sortOrder === 'ASC'
		})).pipe(first());
	}

	createQueryFromFilters(filtergroup) {
		return filtergroup ?
			filtergroup.filters.map(({ type, value }) => `${this.getFieldName(type)}.id == "${value}"`).join(' or ') :
			'';
	}

	getFieldName(type) {
		if (type === 'tag') {
			return 'tags';
		}
		return type;
	}

	selectById(id: string): Observable<Product> {
		return this.apollo.subscribe({ query: ProductQueries.oneProduct, variables: { query: `id == "${id}"` } }).pipe(
			filter((r: any) => r.data.products),
			map((r: any) => r.data.products[0])
		);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.apollo.update({ mutation: ProductQueries.updateProduct, input: product, typename: 'Product' }).pipe(first());
	}

	deleteProducts(ids: string[]) {
		throw Error('not implemented yet');
	}

	addFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	downloadFile(): Observable<any> {
		throw Error('not implemented yet');
	}

	addImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeImage(): Observable<any> {
		throw Error('not implemented yet');
	}

	rotateImage(): Observable<any> {
		throw Error('not implemented yet');
	}
}

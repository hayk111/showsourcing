import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product, Project } from '~models';
import { ProductQueries } from '~features/products/services/product.queries';
import { fromPromise } from 'rxjs/Observable/fromPromise';
import { take, map, filter, first } from 'rxjs/operators';

@Injectable()
export class ProductService {
	private productsQuery$: QueryRef<string, any>;

	constructor(private apollo: Apollo) { }

	/*
		Initialize the underlying query ref for the list of
		products.
	 */
	private initializeProductQuery({ perPage }) {
		if (!this.productsQuery$) {
			this.productsQuery$ = this.apollo.watchQuery<any>({
				query: ProductQueries.list,
				variables: {
					query: '',
					skip: 0,
					take: perPage,
				}
			});
		}
	}

	/*
		Initialize the underlying query ref for the list of
		products.
	 */
	selectProducts({ perPage }): Observable<Product[]> {
		this.initializeProductQuery({ perPage });
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
	loadProductsNextPage({ page, perPage }) {
		this.initializeProductQuery({ perPage });
		return fromPromise(this.productsQuery$.fetchMore({
			variables: {
				skip: page * perPage,
				take: perPage,
				query: ''
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
	sortProducts({ sort, perPage }) {
		this.initializeProductQuery({ perPage });
		return fromPromise(this.productsQuery$.refetch({
			skip: 0,
			take: perPage,
			sortBy: sort.sortBy,
			descending: sort.sortOrder === 'DESC',
			query: ''
		})).pipe(first());
	}

	/*
		Filter the products data for a specified filter group.

		This method returns an observable to register on to be
		notified when the processing ends.
	 */
	filterProducts({ filtergroup, perPage }) {
		this.initializeProductQuery({ perPage });
		return fromPromise(this.productsQuery$.refetch({
			skip: 0,
			take: perPage,
			query: filtergroup.filters.map(({ type, value }) => `${type}.id == "${value}"`).join(' or ')
		})).pipe(first());
	}

	selectById(id: string): Observable<Product> {
		return this.apollo.subscribe({ query: ProductQueries.oneProduct, variables: { query: `id == "${id}"` } }).pipe(
			filter(r => r.data.products),
			map(r => r.data.products[0])
		);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.apollo.mutate({ mutation: ProductQueries.updateProduct, variables: { product } }).pipe(
			take(1)
		);
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
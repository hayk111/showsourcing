import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map, tap, publish, take, refCount } from 'rxjs/operators';
import { ProductQueries } from '~features/products/services/product.queries';
import { Product } from '~models';

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

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	loadProductsNextPage({ page, perPage }) {
		this.initializeProductQuery({ perPage });
		return this.productsQuery$.fetchMore({
			variables: {
				skip: page * perPage,
				take: perPage
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) { return prev; }
				return {
					...prev,
					products: [...prev.products, ...fetchMoreResult.products],
				};
			}
		});
	}

	/*
		Sorts the products data for a specified column.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	sortProducts({ sort, perPage }) {
		this.initializeProductQuery({ perPage });
		return this.productsQuery$.refetch({
			variables: {
				skip: 0,
				take: perPage,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'DESC'
			}
		});
	}

	getById(id: string): Observable<Product> {
		throw Error('not implemented yet');
	}

	updateProduct(product: Product): Observable<Product> {
		throw Error('not implemented yet');
	}

	deleteProducts(ids: string[]) {
		throw Error('not implemented yet');
	}

	addTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeTask(): Observable<any> {
		throw Error('not implemented yet');
	}

	addComment(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeProject(id: string): Observable<any> {
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
import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { forkJoin, from, Observable } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { ProductFeatureQueries } from '~features/products/services/product-feature.queries';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';

@Injectable()
export class ProductFeatureService {
	private productsQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		products.
	 */
	private initializeProductQuery() {
		if (!this.productsQuery$) {
			this.productsQuery$ = this.apollo.query<any>({
				query: ProductFeatureQueries.list,
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
		Method used to get an observable to link on to
		get the list of products.

		Returns an hot observable to be notified each time
		the products data associated with the query changes.
	 */
	selectProducts(): Observable<Product[]> {
		this.initializeProductQuery();
		return this.productsQuery$.valueChanges
			.pipe(
				map(({ data }) => (<any>data).products),
		);
	}

	/*
	 *	Triggers the load of a page of products based on
	 *	a page number.
	 *
	 *	This method returns a observable to register on to be
	 *	notified when the processing ends.
	 */
	loadProductsNextPage({ page, sort, filtergroup }) {
		this.initializeProductQuery();
		return from(this.productsQuery$.fetchMore({
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
		return from(this.productsQuery$.refetch({
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
		return from(this.productsQuery$.refetch(sort ? {
			skip: 0,
			take: PER_PAGE,
			query: this.createQueryFromFilters(filtergroup),
			sortBy: sort.sortBy,
			descending: sort.sortOrder === 'ASC'
		} : {
				skip: 0,
				take: PER_PAGE,
				query: this.createQueryFromFilters(filtergroup),
				sortBy: 'name',
				descending: true
			})).pipe(first());
	}

	createQueryFromFilters(filtergroup) {
		return filtergroup ?
			filtergroup
				.filters
				.map(({ type, value }) => this.getFieldCondition(type, value)).join(' or ') : '';
	}

	private getFieldName(type) {
		if (type === 'tag') {
			return 'tags';
		}
		return type;
	}

	private getFieldCondition(type, value) {
		return (type !== 'favorite' && type !== 'archived') ?
			`${this.getFieldName(type)}.id == "${value}"` :
			`${this.getFieldName(type)} == ${value}`;
	}

	selectById(id: string): Observable<Product> {
		return this.apollo.subscribe({
			query: ProductFeatureQueries.oneProduct,
			variables: { query: `id == "${id}"` }
		}).pipe(
			filter((r: any) => r.data.products),
			map((r: any) => r.data.products[0])
		);
	}

	updateProduct(product: Product): Observable<Product> {
		return this.apollo.update({ mutation: ProductFeatureQueries.updateProduct, input: product, typename: 'Product' }).pipe(first());
	}

	deleteProduct(productId: string): Observable<Product> {
		return this.apollo.update({ mutation: ProductFeatureQueries.deleteProduct, input: productId, typename: 'Product' }).pipe(first());
	}

	deleteProducts(products: string[]) {
		return forkJoin(products.map(productId => this.deleteProduct(productId)));
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

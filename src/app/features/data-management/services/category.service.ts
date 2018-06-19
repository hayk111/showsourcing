import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { ApolloClient } from '~shared/apollo';
import gql from 'graphql-tag';
import { map, tap, publish, take, refCount, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryQueries } from '~features/data-management/services/category.queries';
import { Category } from '~models';
import { Contact, Task } from '~models';
import { Product } from '~models';
import { uuid } from '~utils/uuid.utils';
import { PER_PAGE } from '~utils/constants';


@Injectable()
export class CategoryService {
	private categoriesQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		suppliers.
	 */
	private initializeCategoryQuery(): void {
		if (!this.categoriesQuery$) {
			this.categoriesQuery$ = this.apollo.query<any>({
				query: CategoryQueries.list,
				variables: {
					skip: 0,
					take: PER_PAGE
				}
			});
		}
	}

	/*
		Method used to get an observable to link on to
		get the list of suppliers.

		Returns an hot observable to be notified each time
		the suppliers data associated with the query changes.
	 */
	selectCategories(): Observable<Category[]> {
		this.initializeCategoryQuery();
		return this.categoriesQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).categories),
		);
	}

	/*
		Triggers the load of a page of suppliers based on
		a page number.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	loadCategoriesNextPage({ page, sort }): Promise<any> {
		this.initializeCategoryQuery();
		return this.categoriesQuery$.fetchMore({
			variables: sort ? {
				skip: page * PER_PAGE,
				take: PER_PAGE,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'ASC'
			} : {
					skip: page * PER_PAGE,
					take: PER_PAGE
				},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) { return prev; }
				return {
					...prev,
					categories: [...prev.categories, ...fetchMoreResult.categories],
				};
			}
		});
	}

	/*
		Sorts the suppliers data for a specified column.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	sortCategories({ sort }): Promise<any> {
		this.initializeCategoryQuery();
		return this.categoriesQuery$.refetch({
			variables: {
				skip: 0,
				take: PER_PAGE,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'ASC'
			}
		});
	}

	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<Category> {
		return this.apollo.subscribe({ query: CategoryQueries.category, variables: { query: `id == '${id}'` } }).pipe(
			filter((r: any) => r.data.categories),
			map((r: any) => r.data.categories[0])
		);
	}

	createCategory(category: Category) {
		return this.apollo.create({ mutation: CategoryQueries.createCategory, input: category, typename: 'Category' })
			.pipe(
				map((r: any) => r.data.addCategory.id)
			);
	}

	// /** gets the latest products, w */
	// getLatestProducts(supplierId: string): Observable<Product[]> {
	// 	return this.apollo.subscribe({
	// 		query: SupplierQueries.latestProducts,
	// 		variables: { query: `supplier.id == '${supplierId}'` }
	// 	}).pipe(
	// 		map((r: any) => r.data.products)
	// 	);
	// }


	updateCategory(category: Category) {
		return this.apollo.update({
			mutation: CategoryQueries.updateCategory,
			input: category,
			typename: 'Category'
		});
	}

	removeCategory(ids: string[]) {
		throw Error('not implemented yet');
	}
}


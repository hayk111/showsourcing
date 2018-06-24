import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { CategoryQueries } from '~features/data-management/services/category.queries';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';


@Injectable()
export class CategoryService {
	private categoriesQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		categories.
	 */
	private initializeCategoryQuery(): void {
		if (!this.categoriesQuery$) {
			this.categoriesQuery$ = this.apollo.query<any>({
				query: CategoryQueries.list,
				variables: {
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
		get the list of suppliers.

		Returns an hot observable to be notified each time
		the suppliers data associated with the query changes.
	 */
	selectCategories(): Observable<Category[]> {
		throw Error('this service is done in michael version')

		// this.initializeCategoryQuery();
		// return this.categoriesQuery$.valueChanges
		// 	.pipe(
		// 		map(({ data, loading }) => (<any>data).categories),
		// );
	}

	/*
		Triggers the load of a page of suppliers based on
		a page number.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	loadCategoriesNextPage({ page, sort }): Promise<any> {
		throw Error('this service is done in michael version')

		// this.initializeCategoryQuery();
		// return this.categoriesQuery$.fetchMore({
		// 	variables: sort ? {
		// 		skip: page * PER_PAGE,
		// 		take: PER_PAGE,
		// 		sortBy: sort.sortBy,
		// 		descending: sort.sortOrder === 'ASC'
		// 	} : {
		// 			skip: page * PER_PAGE,
		// 			take: PER_PAGE
		// 		},
		// 	updateQuery: (prev, { fetchMoreResult }) => {
		// 		if (!fetchMoreResult) { return prev; }
		// 		return {
		// 			...prev,
		// 			categories: [...prev.categories, ...fetchMoreResult.categories],
		// 		};
		// 	}
		// });
	}

	/*
		Sorts the suppliers data for a specified column.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	sortCategories({ sort }) {
		throw Error('this service is done in michael version')

		// console.log('inside');
		// console.log(sort);
		// this.initializeCategoryQuery();
		// return from(this.categoriesQuery$.refetch({
		// 	skip: 0,
		// 	take: PER_PAGE,
		// 	sortBy: sort.sortBy,
		// 	descending: sort.sortOrder === 'ASC'
		// })).pipe(first());
	}

	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<Category> {
		throw Error('this service is done in michael version')
		// return this.apollo.se({ query: CategoryQueries.category, id }).pipe(
		// 	filter((r: any) => r.data.categories),
		// 	map((r: any) => r.data.categories[0])
		// );
	}

	createCategory(category: Category) {
		throw Error('this service is done in michael version')

		// return this.apollo.create({ mutation: CategoryQueries.createCategory, input: category, typename: 'Category' })
		// 	.pipe(
		// 		map((r: any) => r.data.addCategory.id)
		// 	);
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
		throw Error('this service is done in michael version');
		// return this.apollo.update({
		// 	mutation: CategoryQueries.updateCategory,
		// 	input: category,
		// 	typename: 'Category'
		// });
	}

	removeCategory(ids: string[]) {
		throw Error('not implemented yet');
	}
}


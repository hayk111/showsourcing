import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SupplierFeatureQueries } from '~features/supplier/services/supplier-feature.queries';
import { Product, Supplier, Task } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';


@Injectable()
export class SupplierFeatureService {
	private suppliersQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	/*
		Initialize the underlying query ref for the list of
		suppliers.
	 */
	private initializeSupplierQuery(): void {
		if (!this.suppliersQuery$) {
			this.suppliersQuery$ = this.apollo.query<any>({
				query: SupplierFeatureQueries.list,
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
	selectSuppliers(): Observable<Supplier[]> {
		this.initializeSupplierQuery();
		return this.suppliersQuery$.valueChanges
			.pipe(
				map(({ data, loading }) => (<any>data).suppliers),
		);
	}

	/*
		Triggers the load of a page of suppliers based on
		a page number.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	loadSuppliersNextPage({ page, sort }): Promise<any> {
		this.initializeSupplierQuery();
		return this.suppliersQuery$.fetchMore({
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
					suppliers: [...prev.suppliers, ...fetchMoreResult.suppliers],
				};
			}
		});
	}

	/*
		Sorts the suppliers data for a specified column.

		This method returns a promise to register on to be
		notified when the processing ends.
	 */
	sortSuppliers({ sort }): Promise<any> {
		this.initializeSupplierQuery();
		return this.suppliersQuery$.refetch({
			variables: {
				skip: 0,
				take: PER_PAGE,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'ASC'
			}
		});
	}

	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<Supplier> {
		return this.apollo.subscribe({ query: SupplierFeatureQueries.supplier, variables: { query: `id == '${id}'` } }).pipe(
			filter((r: any) => r.data.suppliers),
			map((r: any) => r.data.suppliers[0])
		);
	}

	createSupplier(supplier: Supplier) {
		return this.apollo.create({ mutation: SupplierFeatureQueries.createSupplier, input: supplier, typename: 'Supplier' })
			.pipe(
				map((r: any) => r.data.addSupplier.id)
			);
	}

	/** gets the latest products, w */
	getLatestProducts(supplierId: string): Observable<Product[]> {
		return this.apollo.subscribe({
			query: SupplierFeatureQueries.latestProducts,
			variables: { query: `supplier.id == '${supplierId}'` }
		}).pipe(
			map((r: any) => r.data.products)
		);
	}

	getTasks(supplierId: string): Observable<Task[]> {
		throw Error('not implemented yet');
	}

	updateSupplier(supplier: Supplier) {
		return this.apollo.update({
			mutation: SupplierFeatureQueries.updateSupplier,
			input: supplier,
			typename: 'Supplier'
		});
	}

	removeSuppliers(ids: string[]) {
		throw Error('now implemented yet');
	}

	addTag(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeTag(): Observable<any> {
		throw Error('not implemented yet');
	}

	addCategory(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeCategory(): Observable<any> {
		throw Error('not implemented yet');
	}

	addContact(): Observable<any> {
		throw Error('not implemented yet');
	}

	removeContact(): Observable<any> {
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


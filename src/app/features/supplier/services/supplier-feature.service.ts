import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SupplierFeatureQueries } from '~features/supplier/services/supplier-feature.queries';
import { Product, Supplier, Task } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';
import { SupplierService } from '../../../global-services/supplier/supplier.service';


@Injectable()
export class SupplierFeatureService {
	private suppliersQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient, private supplierSrv: SupplierService) { }

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

	selectOne(id: string): Observable<Supplier> {
		return this.supplierSrv.selectOne(id);
	}

	createSupplier(supplier: Supplier) {
		return this.supplierSrv.create(supplier);
	}

	updateSupplier(supplier: Supplier) {
		return this.supplierSrv.update(supplier);
	}

	deleteSuppliers(any: any) {
		throw Error('not implemented yet');
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



}


import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap, publish, take, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SupplierQueries } from '~app/features/supplier/services/supplier.queries';
import { Supplier } from '~models';
import { Contact, Task } from '~models';
import { Product } from '~models';
import { uuid } from '~app/app-root/utils/uuid.utils';


@Injectable()
export class SupplierService {
	suppliersQuery$: QueryRef<string, any>;

	constructor(private apollo: Apollo) { }

    initializeSupplierQuery({ perPage }) {
        if (!this.suppliersQuery$) {
            this.suppliersQuery$ = this.apollo.watchQuery<any>({
                query: SupplierQueries.list,
                variables: {
                    $skip: 0,
                    $take: perPage,
                }
            });
        }
    }

	selectSuppliers({ perPage }): Observable<Supplier[]> {
        this.initializeSupplierQuery({ perPage });
        return this.suppliersQuery$.valueChanges
            .pipe(
                map(({ data, loading }) => (<any>data).suppliers),
            );
	}

	getSuppliersPage({ page, perPage }) {
        this.initializeSupplierQuery({ perPage });
		return this.suppliersQuery$.fetchMore({
            variables: {
                '$skip': page * perPage,
                '$take': perPage
            },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) { return prev; }
				return Object.assign({}, prev, {
					suppliers: [...prev.suppliers, ...fetchMoreResult.suppliers],
				});
			}
		});
	}

	sortSuppliers({ sort, perPage }) {
        this.initializeSupplierQuery({ perPage });
		return this.suppliersQuery$.refetch({
            variables: {
                '$skip': 0,
				'$take': perPage,
				sortBy: sort.sortBy,
				descending: sort.sortOrder === 'DESC'
            }
		});
	}

	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<Supplier> {
		return this.apollo.subscribe({ query: SupplierQueries.supplier, variables: { query: `id == '${id}'` } }).pipe(
			map((r: any) => r.data.suppliers[0])
		);
	}

	createSupplier(supplier: Supplier) {
		return this.apollo.subscribe({ query: SupplierQueries.createSupplier, variables: { supplier } })
			.pipe(
				take(1),
				map((r: any) => r.data.addSupplier.id)
			);
	}

	getLatestProducts(supplierId: string): Observable<Product[]> {
		return this.apollo.subscribe({
			query: SupplierQueries.latestProducts,
			variables: { query: `id == '${supplierId}'` }
		}).pipe(
			map((r: any) => r.data.products)
		);
	}

	getTasks(supplierId: string): Observable<Task[]> {
		throw Error('not implemented yet');
	}

	updateSupplier(supplier: Supplier) {
		return this.apollo.mutate({ mutation: SupplierQueries.updateSupplier, variables: { supplier } }).pipe(
			take(1)
		);
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


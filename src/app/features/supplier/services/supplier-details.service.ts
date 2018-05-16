import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap, publish, take, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SupplierDetailsQueries } from '~app/features/supplier/services/supplier-details.queries';
import { Supplier, Task } from '~app/entity';
import { Contact } from '~app/features/supplier/store/contacts/contact.model';
import { Product } from '~app/features/products';
import { uuid } from '~app/app-root/utils/uuid.utils';


@Injectable()
export class SupplierDetailsService {

	constructor(private apollo: Apollo) { }


	// at the moment the subscription works on only one entity and can be done only on list
	getById(id: string): Observable<Supplier> {
		return this.apollo.subscribe({ query: SupplierDetailsQueries.supplier, variables: { query: `id == '${id}'` } }).pipe(
			map((r: any) => r.data.suppliers[0])
		);
	}

	createSupplier(supplier: Supplier) {
		supplier.id = uuid();
		supplier.favorite = false;
		supplier.deleted = false;
		return this.apollo.subscribe({ query: SupplierDetailsQueries.createSupplier, variables: { supplier } })
			.pipe(
				take(1),
				map((r: any) => r.data.addSupplier.id)
			);
	}

	getProducts(supplierId: string): Observable<Product[]> {
		return this.apollo.subscribe({ query: SupplierDetailsQueries.latestProducts, variables: { query: `id == '${supplierId}'` } }).pipe(
			map((r: any) => r.data.products)
		);
	}

	getTasks(supplierId: string): Observable<Task[]> {
		throw Error('not implemented yet');
	}

	editSupplier(supplier: Supplier) {
		return this.apollo.mutate({ mutation: SupplierDetailsQueries.updateSupplier, variables: { supplier } }).pipe(
			take(1)
		).subscribe();
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


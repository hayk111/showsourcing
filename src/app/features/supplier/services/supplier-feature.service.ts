import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Product, Supplier } from '~models';

import { ContactService, ProductService } from '../../../global-services';
import { SupplierService } from '../../../global-services/supplier/supplier.service';


@Injectable()
export class SupplierFeatureService {

	constructor(
		private supplierSrv: SupplierService,
		private productSrv: ProductService,
		private contactSrv: ContactService
	) { }

	selectOne(id: string): Observable<Supplier> {
		return this.supplierSrv.selectOne(id);
	}

	createSupplier(supplier: Supplier) {
		return this.supplierSrv.create(supplier);
	}

	updateSupplier(supplier: Supplier) {
		return this.supplierSrv.update(supplier);
	}

	deleteSuppliers(ids: string[]) {
		return this.supplierSrv.deleteMany(ids);
	}

	/** gets the latest products, w */
	getLatestProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany(
			of({ query: `supplier.id == '${supplierId}'` }),
			7
		);
	}

	selectContacts(supplierId: string): Observable<Contact[]> {
		return this.contactSrv.selectMany(of({ query: `supplier.id == '${supplierId}'` }))
	}

	createContact(contact: Contact): Observable<Contact> {
		return this.contactSrv.create(contact);
	}

	updateContact(contact: Contact) {
		return this.contactSrv.update(contact);
	}

}


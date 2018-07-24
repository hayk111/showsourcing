import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Product } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { SelectParams } from '~global-services/_global/select-params';
import { ContactService, ProductService } from '~global-services';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { first } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SupplierFeatureService extends SupplierService {

	constructor(
		protected wrapper: ApolloWrapper,
		private productSrv: ProductService,
		private contactSrv: ContactService
	) {
		super(wrapper);
	}


	/** gets the products of the supplier */
	getProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany(
			of(new SelectParams({ query: `supplier.id == '${supplierId}'` }))
		).pipe(
			first()
		);
	}

	selectContacts(supplierId: string): Observable<Contact[]> {
		return this.contactSrv.selectMany(
			of(new SelectParams({ query: `supplier.id == '${supplierId}'` }))
		);
	}

	createContact(contact: Contact): Observable<Contact> {
		return this.contactSrv.create(contact);
	}

	updateContact(contact: Contact) {
		return this.contactSrv.update(contact);
	}

	deleteContact(contact: Contact) {
		return this.contactSrv.deleteOne(contact.id);
	}

}


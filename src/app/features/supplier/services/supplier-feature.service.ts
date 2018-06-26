import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Product } from '~models';
import { ApolloClient } from '~shared/apollo';

import { SelectParams } from '~global-services/_global/select-params';
import { ContactService, ProductService } from '~global-services';
import { SupplierService } from '~global-services/supplier/supplier.service';


@Injectable()
export class SupplierFeatureService extends SupplierService {

	constructor(
		protected apollo: ApolloClient,
		private productSrv: ProductService,
		private contactSrv: ContactService
	) {
		super(apollo);
	}


	/** gets the latest products, w */
	getLatestProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany(
			of(new SelectParams({ query: `supplier.id == '${supplierId}'` }))
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

}


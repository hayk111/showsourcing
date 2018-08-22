import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Product } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { SelectParams } from '~global-services/_global/select-params';
import { ContactService, ProductService, UserService } from '~global-services';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { first } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SupplierFeatureService extends SupplierService {

	constructor(
		protected wrapper: ApolloWrapper,
		protected productSrv: ProductService,
		protected contactSrv: ContactService,
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}


	/** gets the products of the supplier */
	getProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany(
			{ query: `supplier.id == '${supplierId}'` }
		).pipe(
			first()
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


import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact, Product } from '~models';
import { Apollo } from 'apollo-angular';

import { SelectParams } from '~global-services/_global/select-params';
import { ContactService, ProductService, UserService } from '~global-services';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { first } from 'rxjs/operators';
import { ProductQueries } from '~global-services/product/product.queries';
import { ApolloStateService } from '~core/apollo';


@Injectable({
	providedIn: 'root'
})
export class SupplierFeatureService extends SupplierService {

	constructor(
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected contactSrv: ContactService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}


	/** gets the products of the supplier */
	getProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.queryMany(
			{ query: `supplier.id == '${supplierId}'` },
			ProductQueries.images
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
		return this.contactSrv.delete(contact.id);
	}

}


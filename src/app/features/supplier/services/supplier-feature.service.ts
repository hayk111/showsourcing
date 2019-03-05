import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo';
import { ContactService, ProductService, UserService } from '~entity-services';
import { ProductQueries } from '~entity-services/product/product.queries';
import { SupplierService } from '~entity-services/supplier/supplier.service';
import { Contact, Product } from '~models';


@Injectable({
	providedIn: 'root'
})
export class SupplierFeatureService extends SupplierService {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected productSrv: ProductService,
		protected contactSrv: ContactService,
		protected userSrv: UserService
	) {
		super(analyticsSrv, apolloState, userSrv);
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

	getContacts(supplierId) {
		return this.contactSrv.selectMany({
			query: `supplier.id == "${supplierId}"`
		});
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


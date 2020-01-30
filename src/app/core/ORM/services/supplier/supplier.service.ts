import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/orm/services/_global/global-with-audit.service';
import { SupplierQueries } from '~core/orm/services/supplier/supplier.queries';
import { UserService } from '~core/orm/services/user/user.service';
import { Product, Supplier } from '~core/orm/models';

import { ContactService } from '../contact/contact.service';
import { ProductService } from '../product/product.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalWithAuditService<Supplier> {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		private productSrv: ProductService,
		private contactSrv: ContactService) {
		super(apolloState, SupplierQueries, 'supplier', 'suppliers', userSrv, analyticsSrv);
	}

	/** gets the products of the supplier */
	getProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany(
			{ query: `supplier.id == '${supplierId}' AND archived == false AND deleted == false` }
		);
	}

	getContacts(supplierId) {
		return this.contactSrv.selectMany({
			query: `supplier.id == "${supplierId}" AND deleted == false`
		});
	}

	/**
	 * deassociate an array of products from the products on a supplier
	 * @param products products to diassociate from supplier
	 * @returns
	 */
	deassociateProducts(products: Product[]): Observable<Product[]> {
		const deassociatedProducts = (products || []).map(product => ({ id: product.id, supplier: null }));
		return this.productSrv.updateMany(deassociatedProducts);
	}

}

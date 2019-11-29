import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { SupplierQueries } from '~entity-services/supplier/supplier.queries';
import { UserService } from '~entity-services/user/user.service';
import { Supplier, Product } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ProductService } from '../product/product.service';
import { ContactService } from '../contact/contact.service';
import { ProductQueries } from '../product/product.queries';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

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
		return this.productSrv.queryMany(
			{ query: `supplier.id == '${supplierId}' AND archived == false AND deleted == false` },
			ProductQueries.images
		).pipe(
			first()
		);
	}

	getContacts(supplierId) {
		return this.contactSrv.selectMany({
			query: `supplier.id == "${supplierId}" AND deleted == false`
		});
	}

}

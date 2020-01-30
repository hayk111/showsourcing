import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Product, Supplier } from '~core/erm/models';
import { SupplierQueries } from '~core/erm/services/supplier/supplier.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { ContactService } from '../contact/contact.service';
import { ProductService } from '../product/product.service';



@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalWithAuditService<Supplier> {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected userSrv: UserService,
		private productSrv: ProductService,
		private contactSrv: ContactService) {
		super(SupplierQueries, 'supplier', 'suppliers', userSrv, analyticsSrv);
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

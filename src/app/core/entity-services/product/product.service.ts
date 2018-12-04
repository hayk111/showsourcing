import { Injectable } from '@angular/core';
import { GlobalService } from '~entity-services/_global/global.service';
import { ProductQueries } from '~entity-services/product/product.queries';
import { UserService } from '~entity-services/user/user.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { Product, ProductStatus, ProductStatusType } from '~models';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {
	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProductQueries, 'product', 'products', userSrv);
	}
	updateProductStatus(product: Product, statusType: ProductStatusType) {
		// we check if the product has a status
		if (statusType !== undefined) {
			if (!product.status || !product.status.status) {
				const tempStatus = new ProductStatus({ status: { id: statusType.id } }) as any;
				return this.update({ id: product.id, status: tempStatus });
			} else {
				// we dont update if we click the same status as the current one of the product
				const productStatusType = product.status.status;
				if (statusType.id !== productStatusType.id) {
					const tempStatus = new ProductStatus({ status: { id: statusType.id } }) as any;
					return this.update({ id: product.id, status: tempStatus });
				}
			}
		}
		return of();
	}

}


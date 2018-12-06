import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ProductQueries } from '~entity-services/product/product.queries';
import { UserService } from '~entity-services/user/user.service';
import { Product, ProductStatus } from '~models';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProductQueries, 'product', 'products', userSrv);
	}

}


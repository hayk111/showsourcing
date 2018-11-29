import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ProductQueries } from '~global-services/product/product.queries';
import { UserService } from '~global-services/user/user.service';
import { Product } from '~models';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {
	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProductQueries, 'product', 'products', userSrv);
	}

}


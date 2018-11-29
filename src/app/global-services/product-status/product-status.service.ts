import { Injectable } from '@angular/core';
import { UserService } from '~global-services';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { ProductStatusQueries } from '~global-services/product-status/product-status.queries';
import { ProductStatus } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalWithAuditService<ProductStatus> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProductStatusQueries, 'productStatus', 'productStatuses', userSrv);
	}
}

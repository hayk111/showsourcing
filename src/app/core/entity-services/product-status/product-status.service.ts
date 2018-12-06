import { Injectable } from '@angular/core';
import { UserService } from '~entity-services/user/user.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ProductStatusQueries } from '~entity-services/product-status/product-status.queries';
import { ProductStatus } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalWithAuditService<ProductStatus> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ProductStatusQueries, 'productStatus', 'productStatuses', userSrv);
	}
}

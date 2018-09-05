import { Injectable } from '@angular/core';
import { ProductStatus } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusQueries } from '~global-services/product-status/product-status.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalWithAuditService<ProductStatus> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apollo, apolloState, ProductStatusQueries, 'productStatus', 'productStatuses', userSrv);
	}
}

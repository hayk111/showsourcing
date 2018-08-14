import { Injectable } from '@angular/core';
import { ProductStatus } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusQueries } from '~global-services/product-status/product-status.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalWithAuditService<ProductStatus> {

	constructor(wrapper: ApolloWrapper, protected userSrv: UserService) {
		super(wrapper, new ProductStatusQueries(), 'ProductStatus', userSrv);
	}
}

import { Injectable } from '@angular/core';
import { ProductVoteRequest } from '~models';

import { GlobalService } from '~entity-services/_global/global.service';
import { ProductVoteRequestQueries } from '~entity-services/product-vote-request/product-vote-request.queries';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalWithAuditService<ProductVoteRequest> {

	constructor(protected userSrv: UserService, protected apolloState: ApolloStateService) {
		super(apolloState, ProductVoteRequestQueries, 'productVoteRequest', 'productVoteRequests', userSrv);
	}

}


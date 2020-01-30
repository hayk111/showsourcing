import { Injectable } from '@angular/core';
import { ProductVoteRequest } from '~core/ORM/models';

import { GlobalService } from '~core/ORM/services/_global/global.service';
import { ProductVoteRequestQueries } from '~core/ORM/services/product-vote-request/product-vote-request.queries';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { UserService } from '~core/ORM/services';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalWithAuditService<ProductVoteRequest> {

	constructor(protected userSrv: UserService, protected apolloState: ApolloStateService) {
		super(apolloState, ProductVoteRequestQueries, 'productVoteRequest', 'productVoteRequests', userSrv);
	}

}


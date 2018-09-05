import { Injectable } from '@angular/core';
import { ProductVoteRequest } from '~models';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductVoteRequestQueries } from '~global-services/product-vote-request/product-vote-request.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalWithAuditService<ProductVoteRequest> {

	constructor(protected apollo: Apollo, protected userSrv: UserService, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, ProductVoteRequestQueries, 'productVoteRequest', 'productVoteRequests', userSrv);
	}

}


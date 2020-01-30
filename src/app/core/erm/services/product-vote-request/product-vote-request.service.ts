import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { ProductVoteRequest } from '~core/erm/models';
import { UserService } from '~core/erm/services/user/user.service';
import { ProductVoteRequestQueries } from '~core/erm/services/product-vote-request/product-vote-request.queries';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';



@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalWithAuditService<ProductVoteRequest> {

	constructor(protected userSrv: UserService, protected apolloState: ApolloStateService) {
		super(apolloState, ProductVoteRequestQueries, 'productVoteRequest', 'productVoteRequests', userSrv);
	}

}


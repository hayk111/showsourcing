import { Injectable } from '@angular/core';
import { ProductVoteRequest } from '~core/erm/models';
import { ProductVoteRequestQueries } from '~core/erm/services/product-vote-request/product-vote-request.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';



@Injectable({
	providedIn: 'root'
})
export class ProductVoteRequestService extends GlobalWithAuditService<ProductVoteRequest> {

	constructor(protected userSrv: UserService) {
		super(ProductVoteRequestQueries, 'productVoteRequest', 'productVoteRequests', userSrv);
	}

}


import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { ExternalRequestQueries } from '~global-services/external-request/external-request.queries';
import { UserService } from '~global-services/user/user.service';
import { ExternalRequest } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ExternalRequestQueries, 'externalRequest', 'externalRequests', userSrv);
	}
}


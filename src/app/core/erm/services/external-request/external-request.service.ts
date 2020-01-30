import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { ExternalRequestQueries } from '~core/erm/services/external-request/external-request.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { ExternalRequest } from '~core/erm/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ExternalRequestQueries, 'externalRequest', 'externalRequests', userSrv);
	}
}


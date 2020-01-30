import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { ExternalRequestQueries } from '~core/ORM/services/external-request/external-request.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { ExternalRequest } from '~core/ORM/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ExternalRequestQueries, 'externalRequest', 'externalRequests', userSrv);
	}
}


import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~core/orm/services/_global/global-with-audit.service';
import { ExternalRequestQueries } from '~core/orm/services/external-request/external-request.queries';
import { UserService } from '~core/orm/services/user/user.service';
import { ExternalRequest } from '~core/orm/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class ExternalRequestService extends GlobalWithAuditService<ExternalRequest> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ExternalRequestQueries, 'externalRequest', 'externalRequests', userSrv);
	}
}


import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

import { GlobalWithAuditService } from '../_global/global-with-audit.service';
import { UserService } from '../user/user.service';
import { CreateRequestQueries } from './create-request.queries';
import { CreateRequest } from '~core/models';



@Injectable({ providedIn: 'root' })
export class CreateRequestService extends GlobalWithAuditService<CreateRequest> {
	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, CreateRequestQueries, 'createRequest', 'createRequests', userSrv);
	}

}

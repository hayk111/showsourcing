import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { Request } from '~models';
import { RequestQueries } from './request.queries';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { GlobalWithAuditService } from '../_global/global-with-audit.service';
import { UserService } from '../user/user.service';



@Injectable({ providedIn: 'root' })
export class RequestService extends GlobalWithAuditService<Request> {
	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, RequestQueries, 'request', 'requests', userSrv);
	}

}

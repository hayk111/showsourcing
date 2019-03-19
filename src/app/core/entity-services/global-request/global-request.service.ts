import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalRequest } from '~core/models';
import { GlobalService } from '~entity-services/_global/global.service';

import { GlobalRequestQueries } from './global-request.queries';

@Injectable({ providedIn: 'root' })
export class GlobalRequestService extends GlobalService<GlobalRequest> {

	defaultClient = Client.GLOBAL_REQUEST;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, GlobalRequestQueries, 'request', 'requests');
	}

}

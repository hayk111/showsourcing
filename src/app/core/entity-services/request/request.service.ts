import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { Request } from '~models';

import { RequestQueries } from './request.queries';


@Injectable({ providedIn: 'root' })
export class RequestService extends GlobalService<Request> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestQueries, 'request', 'requests');
	}

}

import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/orm/services/_global/global.service';
import { RequestElement, ERM } from '~core/orm/models';

import { RequestElementQueries } from './request-element.queries';
import { Client } from '~core/apollo/services/apollo-client-names.const';


@Injectable({ providedIn: 'root' })
export class RequestElementService extends GlobalService<RequestElement> {

	defaultClient = Client.GLOBAL_REQUEST;

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestElementQueries, 'requestElement', 'requestElements');
	}

}



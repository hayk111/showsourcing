import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RequestElement } from '~models';

import { RequestElementQueries } from './request-element.queries';
import { Client } from '~core/apollo/services/apollo-client-names.const';



@Injectable({ providedIn: 'root' })
export class RequestElementService extends GlobalService<RequestElement> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestElementQueries, 'requestElement', 'requestElements');
	}

}

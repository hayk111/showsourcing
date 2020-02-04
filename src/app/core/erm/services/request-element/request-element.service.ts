import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { RequestElement } from '~core/erm';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { RequestElementQueries } from './request-element.queries';



@Injectable({ providedIn: 'root' })
export class RequestElementService extends GlobalService<RequestElement> {

	defaultClient = Client.GLOBAL_REQUEST;

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestElementQueries, 'requestElement', 'requestElements');
	}

}



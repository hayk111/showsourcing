import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { IncoTerm } from '~core/models';

import { GlobalService } from '../_global/global.service';
import { IncoTermQueries } from './inco-term.queries';

@Injectable({
	providedIn: 'root'
})
export class IncoTermService extends GlobalService<IncoTerm> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, IncoTermQueries, 'incoterm', 'incoterms');
	}

}

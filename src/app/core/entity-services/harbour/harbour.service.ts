import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { Harbour } from '~core/models';

import { GlobalService } from '../_global/global.service';
import { HarbourQueries } from './harbour.queries';

@Injectable({
	providedIn: 'root'
})
export class HarbourService extends GlobalService<Harbour> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, HarbourQueries, 'harbour', 'harbours');
	}

}

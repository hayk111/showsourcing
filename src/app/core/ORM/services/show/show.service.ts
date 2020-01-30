import { Injectable } from '@angular/core';
import { Show } from '~core/ORM/models';

import { GlobalService } from '~core/ORM/services/_global/global.service';
import { ShowQueries } from '~core/ORM/services/show/show.queries';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class ShowService extends GlobalService<Show> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ShowQueries, 'show', 'shows');
	}

}

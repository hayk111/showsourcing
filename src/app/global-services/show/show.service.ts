import { Injectable } from '@angular/core';
import { Show } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { ShowQueries } from '~global-services/show/show.queries';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~shared/apollo';

@Injectable({ providedIn: 'root' })
export class ShowService extends GlobalService<Show> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, ShowQueries, 'show', 'shows');
	}

}

import { Injectable } from '@angular/core';
import { Booth } from '~models/booth.model';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { BoothQueries } from '~global-services/booth/booth.queries';
import { QueryBuilder } from '~global-services/_global/query-builder.class';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, BoothQueries, 'booth', 'booths');
	}

}

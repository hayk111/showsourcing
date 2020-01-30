import { Injectable } from '@angular/core';
import { Booth } from '~core/ORM/models/booth.model';

import { GlobalService } from '~core/ORM/services/_global/global.service';
import { BoothQueries } from '~core/ORM/services/booth/booth.queries';
import { QueryBuilder } from '~core/ORM/services/_global/query-builder.class';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, BoothQueries, 'booth', 'booths');
	}

}

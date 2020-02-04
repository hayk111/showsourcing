import { Injectable } from '@angular/core';
import { Booth } from '~core/erm/models/booth.model';

import { GlobalService } from '~core/erm/services/_global/global.service';
import { BoothQueries } from '~core/erm/services/booth/booth.queries';
import { QueryBuilder } from '~core/erm/services/_global/query-builder.class';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, BoothQueries, 'booth', 'booths');
	}

}

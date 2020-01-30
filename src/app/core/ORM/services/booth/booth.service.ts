import { Injectable } from '@angular/core';
import { Booth } from '~core/orm/models/booth.model';

import { GlobalService } from '~core/orm/services/_global/global.service';
import { BoothQueries } from '~core/orm/services/booth/booth.queries';
import { QueryBuilder } from '~core/orm/services/_global/query-builder.class';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, BoothQueries, 'booth', 'booths');
	}

}

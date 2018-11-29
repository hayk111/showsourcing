import { Injectable } from '@angular/core';
import { Booth } from '~models/booth.model';

import { GlobalService } from '~global-services/_global/global.service';
import { BoothQueries } from '~global-services/booth/booth.queries';
import { QueryBuilder } from '~global-services/_global/query-builder.class';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class BoothService extends GlobalService<Booth> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, BoothQueries, 'booth', 'booths');
	}

}

import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { WeightUnit } from '~core/ORM/models';

import { GlobalService } from '../_global/global.service';
import { WeightUnitQueries } from './weight-unit.queries';

@Injectable({
	providedIn: 'root'
})
export class WeightUnitService extends GlobalService<WeightUnit> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, WeightUnitQueries, 'weightUnit', 'weightUnits');
	}

}

import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { LengthUnit } from '~core/models';

import { GlobalService } from '../_global/global.service';
import { LengthUnitQueries } from './Length-unit.queries';

@Injectable({
	providedIn: 'root'
})
export class LengthUnitService extends GlobalService<LengthUnit> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, LengthUnitQueries, 'lengthUnit', 'lengthUnits');
	}

}

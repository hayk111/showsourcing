import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { ExtendedField } from '~models';

import { GlobalService } from '../_global/global.service';
import { ExtendedFieldQueries } from './extended-field.queries';


@Injectable({
	providedIn: 'root'
})
export class ExtendedFieldService extends GlobalService<ExtendedField> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ExtendedFieldQueries, 'extendedField', 'ExtendedFields');
	}

}

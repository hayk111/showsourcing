import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { ExtendedFieldDefinition } from '~models';

import { GlobalService } from '../_global/global.service';
import { ExtendedFieldDefinitionQueries } from './extended-field-definition.queries';


@Injectable({
	providedIn: 'root'
})
export class ExtendedFieldDefinitionService extends GlobalService<ExtendedFieldDefinition> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ExtendedFieldDefinitionQueries, 'extendedFieldDefinition', 'extendedFieldDefinitions');
	}

}

import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RequestFieldDefinition } from '~models';

import { RequestFieldDefinitionQueries } from './request-field-definition.queries';


@Injectable({ providedIn: 'root' })
export class RequestFieldDefinitionService extends GlobalService<RequestFieldDefinition> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestFieldDefinitionQueries, 'requestFieldDefinition', 'requestFieldDefinitions');
	}

}

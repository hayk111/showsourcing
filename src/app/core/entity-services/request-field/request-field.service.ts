import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RequestField } from '~models';

import { RequestFieldQueries } from './request-field.queries';


@Injectable({ providedIn: 'root' })
export class RequestFieldService extends GlobalService<RequestField> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestFieldQueries, 'requestField', 'requestFields');
	}

}

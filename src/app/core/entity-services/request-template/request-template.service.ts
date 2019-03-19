import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { RequestTemplate } from '~models';

import { RequestTemplateQueries } from './request-template.queries';


@Injectable({ providedIn: 'root' })
export class RequestTemplateService extends GlobalService<RequestTemplate> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestTemplateQueries, 'requestTemplate', 'requestTemplates');
	}

}

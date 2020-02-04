import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { RequestTemplate } from '~core/erm/models';

import { RequestTemplateQueries } from './request-template.queries';


@Injectable({ providedIn: 'root' })
export class RequestTemplateService extends GlobalService<RequestTemplate> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, RequestTemplateQueries, 'requestTemplate', 'requestTemplates');
	}

}

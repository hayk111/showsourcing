import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { SelectorElement } from '~core/models';
import { GlobalService } from '~entity-services/_global/global.service';

import { SelectorElementQueries } from './selector-element.queries';


@Injectable({
	providedIn: 'root'
})
export class SelectorElementService extends GlobalService<SelectorElement> {

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService) {
		super(apolloState, SelectorElementQueries, 'selectorElement', 'selectorElements');
	}
}

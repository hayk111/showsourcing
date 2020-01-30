import { Injectable } from '@angular/core';
import { AnalyticsService } from '~core/analytics/analytics.service';

import { SelectorElement } from '~core/erm/models';
import { GlobalService } from '~core/erm/services/_global/global.service';

import { SelectorElementQueries } from './selector-element.queries';


@Injectable({
	providedIn: 'root'
})
export class SelectorElementService extends GlobalService<SelectorElement> {

	constructor(
		protected analyticsSrv: AnalyticsService) {
		super(SelectorElementQueries, 'selectorElement', 'selectorElements');
	}
}

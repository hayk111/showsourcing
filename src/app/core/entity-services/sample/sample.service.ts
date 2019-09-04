import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { Sample } from '~models';

import { SampleQueries } from './sample.queries';

@Injectable({
	providedIn: 'root'
})
export class SampleService extends GlobalWithAuditService<Sample> {
	private _sampleListUpdate$ = new Subject<void>();
	sampleListUpdate$ = this._sampleListUpdate$.asObservable();

	constructor(
		protected analyticsSrv: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, SampleQueries, 'sample', 'samples', userSrv, analyticsSrv);
	}

	onUpdateSampleList() {
		console.log('onUpdateSampleList called...');
		this._sampleListUpdate$.next();
	}
}

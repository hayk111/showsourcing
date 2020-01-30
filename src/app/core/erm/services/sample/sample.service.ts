import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { UserService } from '~core/erm/services/user/user.service';
import { Sample } from '~core/erm/models';

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
		this._sampleListUpdate$.next();
	}
}

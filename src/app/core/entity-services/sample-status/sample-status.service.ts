import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { SampleStatus } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

import { SampleStatusQueries } from './sample-status.queries';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SampleStatusService extends GlobalWithAuditService<SampleStatus> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SampleStatusQueries, 'sampleStatus', 'sampleStatuses', userSrv);
	}
}

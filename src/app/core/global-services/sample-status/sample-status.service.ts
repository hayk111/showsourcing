import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { SampleStatus } from '~models';
import { ApolloStateService } from '~core/apollo';

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

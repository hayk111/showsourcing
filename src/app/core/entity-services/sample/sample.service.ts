import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { Sample } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { UserService } from '~entity-services/user/user.service';
import { SampleQueries } from './sample.queries';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SampleService extends GlobalWithAuditService<Sample> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SampleQueries, 'sample', 'samples', userSrv);
	}
}

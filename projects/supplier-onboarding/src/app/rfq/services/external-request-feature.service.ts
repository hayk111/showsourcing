import { Injectable } from '@angular/core';
import { ExternalRequestService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

}

import { Injectable } from '@angular/core';
import { ExternalRequestService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		protected apollo: Apollo
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}

}

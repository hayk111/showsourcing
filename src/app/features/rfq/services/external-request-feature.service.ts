import { Injectable } from '@angular/core';
import { ExternalRequestService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		protected wrapper: ApolloWrapper,
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}

}

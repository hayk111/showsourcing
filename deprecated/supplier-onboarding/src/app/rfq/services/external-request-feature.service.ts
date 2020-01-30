import { Injectable } from '@angular/core';
import { ExternalRequestService, UserService } from '~entity-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		
		protected userSrv: UserService
	) {
		super(userSrv);
	}

}

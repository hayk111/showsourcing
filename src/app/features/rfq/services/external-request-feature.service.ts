import { Injectable } from '@angular/core';
import { ExternalRequestService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';

@Injectable()
export class ExternalRequestFeatureService extends ExternalRequestService {
	constructor(
		protected apollo: Apollo,
		protected userSrv: UserService
	) {
		super(apollo, userSrv);
	}

}

import { Injectable } from '@angular/core';
import { ProjectService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected apollo: Apollo,
		protected userSrv: UserService
	) {
		super(apollo, userSrv);
	}

}

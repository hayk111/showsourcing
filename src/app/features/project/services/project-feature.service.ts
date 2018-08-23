import { Injectable } from '@angular/core';
import { ProjectService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected apollo: Apollo
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}

}

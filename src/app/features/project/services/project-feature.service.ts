import { Injectable } from '@angular/core';
import { ProjectService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo';

@Injectable()
export class ProjectFeatureService extends ProjectService {
	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

}

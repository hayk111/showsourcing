import { Injectable } from '@angular/core';
import { TagService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo';

@Injectable({
	providedIn: 'root'
})
export class TagManagememtService extends TagService {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, userSrv);
	}
}

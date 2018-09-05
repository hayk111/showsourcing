import { Injectable } from '@angular/core';
import { CategoryService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

@Injectable({
	providedIn: 'root'
})
export class CategoryManagementService extends CategoryService {

	constructor(
		protected apolloState: ApolloStateService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}
}

import { Injectable } from '@angular/core';
import { CategoryService, UserService } from '~entity-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

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

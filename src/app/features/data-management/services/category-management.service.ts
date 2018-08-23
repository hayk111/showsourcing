import { Injectable } from '@angular/core';
import { CategoryService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';

@Injectable({
	providedIn: 'root'
})
export class CategoryManagementService extends CategoryService {

	constructor(
		protected apollo: Apollo,
		protected userSrv: UserService
	) {
		super(apollo, userSrv);
	}
}

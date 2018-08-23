import { Injectable } from '@angular/core';
import { TagService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';

@Injectable({
	providedIn: 'root'
})
export class TagManagememtService extends TagService {

	constructor(protected apollo: Apollo, protected userSrv: UserService) {
		super(apollo, userSrv);
	}
}

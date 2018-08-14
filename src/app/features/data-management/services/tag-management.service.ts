import { Injectable } from '@angular/core';
import { TagService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

@Injectable({
	providedIn: 'root'
})
export class TagManagememtService extends TagService {

	constructor(protected wrapper: ApolloWrapper, protected userSrv: UserService) {
		super(wrapper, userSrv);
	}
}

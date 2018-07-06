import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { User } from '~models';
import { UserQueries } from '~global-services/user/user.queries';
import { ApolloClient, USER_CLIENT, ALL_USER_CLIENT } from '~shared/apollo';
import { UserApolloService } from '~global-services/user/user.apollo.service';
import { log } from '~utils/log';

@Injectable({
	providedIn: 'root'
})
export class UserService extends GlobalService<User> {

	constructor(protected apollo: ApolloClient, protected userApolloService: UserApolloService) {
		super(apollo.use(USER_CLIENT), new UserQueries, 'User');
		log.debug('creation user service');
	}

	selectOne() {
		return this.userApolloService.user$;
	}

	update(user: any) {
		return super.update(user);
	}

}

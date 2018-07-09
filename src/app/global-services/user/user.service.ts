import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalService } from '~global-services/_global/global.service';
import { UserApolloService } from '~global-services/user/user.apollo.service';
import { UserQueries } from '~global-services/user/user.queries';
import { User } from '~models';
import { GqlClient, USER_CLIENT } from '~shared/apollo';

@Injectable({
	providedIn: 'root'
})
export class UserService extends GlobalService<User> {

	constructor(
		protected gqlClient: GqlClient,
		protected userApolloService: UserApolloService,
		private authSrv: AuthenticationService) {
		super(gqlClient.use(USER_CLIENT), new UserQueries, 'User');
	}

	selectUser() {
		return this.authSrv.authState$.pipe(
			map(authState => authState.userId),
			distinctUntilChanged(),
			switchMap(id => super.selectOne(id))
		);
	}
}

import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalService } from '~global-services/_global/global.service';
import { UserQueries } from '~global-services/user/user.queries';
import { User } from '~models';
import { ApolloWrapper, USER_CLIENT } from '~shared/apollo';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	userSync: User;

	constructor(
		wrapper: ApolloWrapper,
		private authSrv: AuthenticationService) {
		super(wrapper.use(USER_CLIENT), new UserQueries, 'User');
		this.selectUser().subscribe(user => this.userSync = user);
	}

	selectUser() {
		return this.authSrv.authState$.pipe(
			map(authState => authState.userId),
			distinctUntilChanged(),
			switchMap(id => super.selectOne(id))
		);
	}
}

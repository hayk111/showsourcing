import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalService } from '~global-services/_global/global.service';
import { UserQueries } from '~global-services/user/user.queries';
import { User } from '~models';
import { ApolloStateService, ApolloWrapper, USER_CLIENT } from '~shared/apollo';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	userSync: User;

	constructor(
		wrapper: ApolloWrapper,
		private authSrv: AuthenticationService,
		private apolloState: ApolloStateService
	) {
		super(wrapper, new UserQueries, 'User');
		this.selectUser().subscribe(user => this.userSync = user);
	}

	selectUser() {
		return this.apolloState.userClientReady$.pipe(
			filter(state => state.ready),
			switchMap(_ => this.authSrv.authState$),
			map(authState => authState.userId),
			distinctUntilChanged(),
			switchMap(id => this.selectOne(id))
		);
	}

	selectOne(id: string, fields?: string) {
		return super.selectOne(id, fields, USER_CLIENT);
	}
}


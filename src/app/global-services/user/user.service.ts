import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap, tap, first } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalService } from '~global-services/_global/global.service';
import { UserQueries } from '~global-services/user/user.queries';
import { User } from '~models';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { Apollo } from 'apollo-angular';
import { USER_CLIENT } from '~shared/apollo/services/initializers/client-names.const';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	userSync: User;
	defaultClient = USER_CLIENT;

	constructor(
		protected apollo: Apollo,
		private authSrv: AuthenticationService,
		private apolloState: ApolloStateService
	) {
		super(apollo, UserQueries, 'user', 'users');
		this.selectUser().subscribe(user => this.userSync = user);
	}

	selectUser() {
		return this.apolloState.userClientReady$.pipe(
			filter(state => state.ready),
			switchMap(_ => this.authSrv.authState$.pipe(first())),
			map(authState => authState.userId),
			distinctUntilChanged(),
			switchMap(id => this.selectOne(id))
		);
	}

}


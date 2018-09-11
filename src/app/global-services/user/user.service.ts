import { Injectable } from '@angular/core';
import { distinctUntilChanged, filter, map, switchMap, tap, first } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { GlobalService } from '~global-services/_global/global.service';
import { UserQueries } from '~global-services/user/user.queries';
import { User } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService, ClientStatus } from '~shared/apollo/services/apollo-state.service';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	userSync: User;
	defaultClient = Client.USER;

	constructor(
		private authSrv: AuthenticationService,
		protected apolloState: ApolloStateService
	) {
		super(apolloState, UserQueries, 'user', 'users');
		this.selectUser().subscribe(user => this.userSync = user);
	}

	selectUser() {
		return this.authSrv.userId$.pipe(
			distinctUntilChanged(),
			switchMap(id => this.selectOne(id))
		);
	}

}


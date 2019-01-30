import { Injectable } from '@angular/core';
import { distinctUntilChanged, shareReplay, switchMap, filter } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { UserQueries } from '~entity-services/user/user.queries';
import { User } from '~models';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GlobalService<User> {

	private user$ = this.authSrv.userId$.pipe(
		distinctUntilChanged(),
		switchMap(id => this.selectOne(id)),
		filter(user => !!user),
		shareReplay(1)
	);
	userSync: User;
	defaultClient = Client.USER;

	constructor(
		private authSrv: AuthenticationService,
		protected apolloState: ApolloStateService
	) {
		super(apolloState, UserQueries, 'user', 'users');
		this.user$.subscribe(user => this.userSync = user);
	}

	selectUser() {
		return this.user$;
	}

}


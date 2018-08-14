import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, first, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { User } from '~models/user.model';
import { ALL_USER_CLIENT, USER_CLIENT } from './client-names.const';
import { ApolloStateService } from './apollo-state.service';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-apollo-initializer.class';
import { ClientInitializerQueries } from '~shared/apollo/services/initializers/initializer-queries';
import { log } from '~utils/log';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private wrapper: ApolloWrapper,
	) {
		super(apollo, link);
	}

	init() {
		// when authenticated we start user client
		this.authSrv.authState$.pipe(
			distinctUntilChanged((x, y) => x.userId === y.userId),
			filter(authState => authState.authenticated),
			switchMap(authState => this.getUser(authState.userId)),
			switchMap(user => super.getRealmUri(user.realmServerName, user.realmPath))
		).subscribe(uri => this.initUserClient(uri, this.tokenSrv.accessTokenSync.token));


		// when unauthenticated we reset user client
		this.authSrv.authState$.pipe(
			distinctUntilChanged((x, y) => x.userId === y.userId),
			filter(authState => !authState.authenticated),
		).subscribe(user => this.resetClient());

	}

	/** create the user client  */
	private initUserClient(uri: string, token: string) {
		try {
			super.createClient(uri, USER_CLIENT, token);
			this.apolloState.setUserClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setUserClientNotReady();
		}
	}

	/** gets user from all-users realm */
	private getUser(id: string): Observable<User> {
		// we use a query here because we need to get the user once from all_user client
		return this.wrapper.use(ALL_USER_CLIENT).selectOne(
			ClientInitializerQueries.selectUser,
			id
		).pipe(
			first()
		);
	}

	private resetClient() {
		super.clearClient(USER_CLIENT);
		this.apolloState.resetUserClient();
	}
}

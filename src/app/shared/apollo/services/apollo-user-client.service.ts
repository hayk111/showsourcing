import { Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, first, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { User } from '~models/user.model';
import { ApolloStateService } from './apollo-state.service';
import { Apollo } from 'apollo-angular';
import { log } from '~utils/log';
import { filter } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from '~global-services/user/user.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';

@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private userSrv: UserService
	) {
		super(apollo, link);
	}

	init() {
		// when authenticated we start user client
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.fetchAccessToken(token)),
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
		return this.userSrv.queryOne(id, 'realmServerName, realmPath', ALL_USER_CLIENT);
	}

	private resetClient() {
		super.clearClient(USER_CLIENT);
		this.apolloState.resetUserClient();
	}

}

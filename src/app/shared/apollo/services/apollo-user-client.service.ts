import { Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, first, switchMap, map } from 'rxjs/operators';
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
import { USER_CLIENT, ALL_USER_CLIENT } from '~shared/apollo/services/apollo-client-names.const';


@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		private userSrv: UserService
	) {
		super(apollo, link, apolloState);
	}

	init(): void {
		// when there is a refreshToken we start the client
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.getAccessToken(token, USER_CLIENT)),
			switchMap(accessToken => this.getUser(accessToken.token_data.identity).pipe(
				switchMap(user => super.getRealmUri(user.realmServerName, user.realmPath)),
				map(uri => ({ uri, token: accessToken.token }))
			))
		).subscribe(({ uri, token }) => this.initClient(uri, token, USER_CLIENT));


		// when the refreshToken is gone we close it
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(tokenState => !tokenState),
		).subscribe(_ => this.resetClient(USER_CLIENT));

	}


	/** gets user from all-users realm */
	private getUser(id: string): Observable<User> {
		// we use a query here because we need to get the user once from all_user client
		return this.userSrv.queryOne(id, 'realmServerName, realmPath', ALL_USER_CLIENT);
	}
}

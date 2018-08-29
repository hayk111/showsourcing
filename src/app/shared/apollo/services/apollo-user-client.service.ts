import { Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, first, switchMap, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { User } from '~models/user.model';
import { ApolloStateService, ClientStatus } from './apollo-state.service';
import { Apollo } from 'apollo-angular';
import { log } from '~utils/log';
import { filter } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
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
			distinctUntilChanged(), filter(token => !!token),

			tap(_ => this.apolloState.setClientPending(USER_CLIENT)),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.getAccessToken(token, USER_CLIENT)),
			switchMap(
				accessToken => this.getUserRealmUri(accessToken.token_data.identity),
				(accessToken, uri) => ({ uri, token: accessToken.token })
			)
		).subscribe(({ uri, token }) => this.initClient(uri, token, USER_CLIENT));


		// when the refreshToken is gone we close it
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(tokenState => !tokenState),
		).subscribe(_ => this.destroyClient(USER_CLIENT));

	}

	private getUserRealmUri(userId: string) {
		// we need to wait for all user client and global const client to be ready
		const allUserClientReady$ = this.apolloState.getClientStatus(ALL_USER_CLIENT).pipe(
			filter(status => status === ClientStatus.READY),
			first(),
		);

		const globalConstClientReady$ = this.apolloState.getClientStatus(ALL_USER_CLIENT).pipe(
			filter(status => status === ClientStatus.READY),
			first(),
		);

		// then we can query the user, and with that user we can get the realm uri...
		// (wasn't my choice)
		return forkJoin([allUserClientReady$, globalConstClientReady$]).pipe(
			switchMap(_ => this.userSrv.queryOne(userId, 'realmServerName, realmPath', ALL_USER_CLIENT).pipe(first())),
			switchMap(user => super.getRealmUri(user.realmServerName, user.realmPath)),
		);
	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { forkJoin, combineLatest, zip } from 'rxjs';
import { filter, first, shareReplay, switchMap, switchMapTo, tap, distinctUntilChanged } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { UserService } from '~global-services/user/user.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { ApolloStateService, ClientStatus } from './apollo-state.service';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';


@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected authSrv: AuthenticationService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected realmServerSrv: RealmServerService
	) {
		super(apollo, link, apolloState, realmServerSrv);
	}

	init(): void {
		super.checkNotAlreadyInit();
		// we get the user id from the auth service
		const userId$ = this.authSrv.userId$.pipe(
			filter(id => !!id),
			tap(_ => this.apolloState.setClientPending(Client.USER)),
			// we don't use distinctUntilChanged because an user can reconnect with the same account
			shareReplay(1)
		);

		const accessToken$ = userId$.pipe(
			// we need one access token per user id, ence the first()
			switchMap(userId => this.tokenSrv.getAccessToken(`user/${userId}`)
				.pipe(first())
			)
		);

		const realmUri$ = userId$.pipe(
			// realm uri won't change if the userId hasn't changed
			switchMap(userId => this.getUserRealmUri(userId))
		);

		zip(realmUri$, accessToken$)
			.subscribe(([uri, token]) => super.initClient(uri, Client.USER, token));


		// when the refreshToken is gone we close it
		this.authSrv.authStatus$.pipe(
			filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		).subscribe(_ => this.destroyClient(Client.USER, 'not authenticated'));

	}

	/** will emit once when all user and global constant are ready */
	private getUserRealmUri(userId: string) {
		// then we can query the user, and with that user we can get the realm uri...
		return this.userSrv.queryOne(userId, 'realmServerName, realmPath', Client.ALL_USER)
			.pipe(
				first(),
				switchMap(user => super.getRealmUri(user.realmServerName, user.realmPath)),
		);
	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { forkJoin, combineLatest } from 'rxjs';
import { filter, first, shareReplay, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { UserService } from '~global-services/user/user.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { ApolloStateService, ClientStatus } from './apollo-state.service';


@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected authSrv: AuthenticationService,
		protected apolloState: ApolloStateService,
		private userSrv: UserService
	) {
		super(apollo, link, apolloState);
	}

	init(): void {
		super.checkNotAlreadyInit();
		const userId$ = this.authSrv.userId$.pipe(
			filter(id => !!id),
			shareReplay(1)
		);

		const accessToken$ = userId$.pipe(
			// we need one access token per user id, ence the first()
			switchMap(userId => this.tokenSrv.getAccessToken(`user/${userId}`)
				.pipe(first())
			)
		);

		const realmUri$ = this.requiredClientsReady().pipe(
			switchMapTo(userId$),
			switchMap(userId => this.getUserRealmUri(userId)),
		);

		combineLatest(realmUri$, accessToken$)
			.subscribe(([uri, token]) => super.initClient(uri, Client.USER, token));


		// when the refreshToken is gone we close it
		this.authSrv.authStatus$.pipe(
			filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		).subscribe(_ => this.destroyClient(Client.USER));

	}

	/** will emit once when all user and global constant are ready */
	private requiredClientsReady() {
		// we need to wait for all user client and global const client to be ready
		const allUserClientReady$ = this.apolloState
			.getClientStatus(Client.ALL_USER).pipe(
				filter(status => status === ClientStatus.READY),
				first()
			);

		const globalConstClientReady$ = this.apolloState
			.getClientStatus(Client.GLOBAL_CONSTANT).pipe(
				filter(status => status === ClientStatus.READY),
				first()
			);
		return forkJoin([allUserClientReady$, globalConstClientReady$]);
	}

	private getUserRealmUri(userId: string) {
		// then we can query the user, and with that user we can get the realm uri...
		return this.userSrv.queryOne(userId, 'realmServerName, realmPath', Client.ALL_USER).pipe(
			first(),
			switchMap(user => super.getRealmUri(user.realmServerName, user.realmPath)),
		);
	}

}


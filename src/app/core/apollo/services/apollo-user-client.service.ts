import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable, zip } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { UserService } from '~entity-services/user/user.service';

import { ApolloStateService } from './apollo-state.service';


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
		super(apollo, link, apolloState, realmServerSrv, Client.USER);
	}

	init(refreshToken: TokenState): Observable<Client> {
		super.checkNotAlreadyInit();

		this.apolloState.setClientPending(Client.USER);

		const userId = refreshToken.token_data.identity;
		const accessToken$ = this.tokenSrv
			.getAccessToken(refreshToken, `user/${userId}/__partial/${userId}`).pipe(
				first()
			);
		const realmUri$ = super.getRealmUri('default', `user/${userId}/__partial/${userId}`);

		return zip(realmUri$, accessToken$).pipe(
			switchMap(([uri, token]) => this.createClient(uri, Client.USER, token)),
			takeUntil(this.destroyed$),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);
	}

	/** @deprecated: this was used when all user was a thing */
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


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { Observable, zip, of } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { UserService } from '~entity-services/user/user.service';

import { ApolloStateService } from './apollo-state.service';
import { environment } from 'environments/environment';


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
		const realmUri = `${environment.graphqlUrl}/user/${userId}/__partial/${userId}`;

		return accessToken$.pipe(
			switchMap(token => this.createClient(realmUri, Client.USER, token)),
			takeUntil(this.destroyed$),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);
	}

}


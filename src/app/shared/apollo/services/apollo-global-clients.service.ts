import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { merge, zip } from 'rxjs';
import { distinctUntilChanged, filter, switchMapTo } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService,
		protected realmServerSrv: RealmServerService
	) {
		super(apollo, httpLink, apolloState, realmServerSrv);
	}

	init() {
		this.checkNotAlreadyInit();

		const allUserUri = `${environment.graphqlUrl}/${Client.ALL_USER}`;
		const globalConstUri = `${environment.graphqlUrl}/${Client.GLOBAL_CONSTANT}`;
		const globalDataUri = `${environment.graphqlUrl}/${Client.GLOBAL_DATA}`;

		const tokens$ = zip(
			this.tokenSrv.getAccessToken(Client.ALL_USER),
			this.tokenSrv.getAccessToken(Client.GLOBAL_CONSTANT),
			this.tokenSrv.getAccessToken(Client.GLOBAL_DATA)
		);
		// when accessToken for each of those clients,
		// will wait for user authentication..
		this.authSrv.authenticated$.pipe(
			switchMapTo(tokens$)
		).subscribe(([token1, token2, token3]) => {
			this.initClient(allUserUri, Client.ALL_USER, token1);
			this.initClient(globalConstUri, Client.GLOBAL_CONSTANT, token2);
			this.initClient(globalDataUri, Client.GLOBAL_DATA, token3);
		});

		// destroy clients when unauthenticated
		this.authSrv.authStatus$.pipe(
			distinctUntilChanged(),
			filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		).subscribe(_ => {
			this.destroyClient(Client.ALL_USER, 'no refresh token');
			this.destroyClient(Client.GLOBAL_CONSTANT, 'no refresh token');
			this.destroyClient(Client.GLOBAL_DATA, 'no refresh token');
		});
	}
}


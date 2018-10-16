import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { merge, zip } from 'rxjs';
import { distinctUntilChanged, filter, switchMapTo, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { ApolloStateService } from './apollo-state.service';

@Injectable({ providedIn: 'root' })
export class SupplierOnboardingClient extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected httpLink: HttpLink,
		protected realmServerSrv: RealmServerService,
		protected authSrv: AuthenticationService,
		protected tokenSrv: TokenService
	) {
		super(apollo, httpLink, apolloState, realmServerSrv);
	}

	init() {
		this.checkNotAlreadyInit();

		// we are currently not using all user
		const uri = `${environment.graphqlUrl}/${Client.SUPPLIER_ONBOARDING}`;
		// when accessToken for each of those clients,
		// will wait for user authentication..
		this.authSrv.authenticated$.pipe(
			switchMap(_ => this.tokenSrv.getAccessToken(Client.SUPPLIER_ONBOARDING)),
			switchMap(token => this.createClient(uri, Client.SUPPLIER_ONBOARDING, token))
		).subscribe(
			_ => this.apolloState.setClientReady(Client.SUPPLIER_ONBOARDING),
			e => this.apolloState.setClientError(Client.SUPPLIER_ONBOARDING, e)
		);

		// destroy clients when unauthenticated
		this.authSrv.authStatus$.pipe(
			distinctUntilChanged(),
			filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		).subscribe(_ => {
			this.destroyClient(Client.SUPPLIER_ONBOARDING, 'no refresh token');
		});
	}
}


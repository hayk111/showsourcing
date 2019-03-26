import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { merge, zip } from 'rxjs';
import { distinctUntilChanged, filter, switchMapTo, switchMap, catchError, tap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { ApolloStateService } from '../src/app/core/apollo/services/apollo-state.service';
import { TokenState } from '~core/auth/interfaces/token-state.interface';

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
		super(apollo, httpLink, apolloState, realmServerSrv, Client.SUPPLIER_ONBOARDING);
	}

	init(refreshToken: TokenState) {
		this.checkNotAlreadyInit();

		// we are currently not using all user
		const uri = `/${Client.SUPPLIER_ONBOARDING}`;
		// when accessToken for each of those clients,
		// will wait for user authentication..


		// deprecated
		// return this.tokenSrv.getAccessToken(refreshToken, Client.SUPPLIER_ONBOARDING).pipe(
		// 	switchMap(token => this.createClient(uri, Client.SUPPLIER_ONBOARDING, token)),
		// 	tap(_ => this.apolloState.setClientReady(Client.SUPPLIER_ONBOARDING)),
		// 	catchError(e => this.onError(e))
		// );
	}
}


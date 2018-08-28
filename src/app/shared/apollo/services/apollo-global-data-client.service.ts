import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { log } from '~utils';
import { filter, first, distinctUntilChanged } from 'rxjs/operators';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { ALL_USER_CLIENT, GLOBAL_CONSTANT_CLIENT, GLOBAL_DATA_CLIENT } from '~shared/apollo/services/apollo-client-names.const';



@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		private apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
	) {
		super(apollo, httpLink);
	}

	init() {
		this.authSrv.authState$.pipe(
			filter(authState => authState.authenticated),
			distinctUntilChanged((x, y) => x.authenticated === y.authenticated)
		).subscribe(authState => this.initGlobalClients(authState.token));

		// when there is a refreshToken and the user has selected a team we initialize the team client
		const accessToken$ = this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.getAccessToken(token, 'TEAM'))
		);
	}

	/** creates global and all-users clients */
	private initClient(token) {
		try {
			// 1. creating all-users client and getting the user
			this.createClient(GLOBAL_DATA_CLIENT, token);
			this.apolloState.setGlobalClientsReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setGlobalClientsNotReady();
		}
	}

	protected createClient(name, token) {
		const uri = `${environment.graphqlUrl}/${name}`;
		super.createClient(uri, name, token);
	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ALL_USER_CLIENT, GLOBAL_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { log } from '~utils';


@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		private apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService
	) {
		super(apollo, tokenSrv, httpLink, authSrv, false);
	}

	init() {
		this.initGlobalClients();
	}

	/** creates global and all-users clients */
	private async initGlobalClients() {
		try {
			// 1. creating all-users client and getting the user
			this.createAllUserClient();
			this.createGlobalClient();
			this.apolloState.setGlobalClientsReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setGlobalClientsNotReady();
		}
	}


	/** creates the client that can access the user which gives the userRealmUri */
	private createAllUserClient() {
		const httpUri = new URL(`${environment.apiUrl}/graphql/${ALL_USER_CLIENT}`);
		const wsUri = new URL(`${environment.apiUrl}/graphql/${ALL_USER_CLIENT}`);
		wsUri.protocol = 'wss';
		super.createClient(httpUri.toString(), wsUri.toString(), ALL_USER_CLIENT);
	}

	private createGlobalClient() {
		const httpUri = new URL(`${environment.apiUrl}/graphql/${GLOBAL_CLIENT}`);
		const wsUri = new URL(`${environment.apiUrl}/graphql/${GLOBAL_CLIENT}`);
		wsUri.protocol = 'wss';
		super.createClient(httpUri.toString(), wsUri.toString(), GLOBAL_CLIENT);
	}

}


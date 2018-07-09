import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { from, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { environment } from 'environments/environment';
import { TokenService } from '~features/auth/services/token.service';
import { ALL_USER_CLIENT, GLOBAL_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { cleanTypenameLink } from '~shared/apollo/services/clean.typename.link';
import { log } from '~utils';
import { AbstractInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { AuthenticationService } from '~features/auth/services/authentication.service';


@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractInitializer {

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


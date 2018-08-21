import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ALL_USER_CLIENT, GLOBAL_CONSTANT_CLIENT, GLOBAL_DATA_CLIENT } from './client-names.const';
import { ApolloStateService } from './apollo-state.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-apollo-initializer.class';
import { log } from '~utils';
import { filter, first, distinctUntilChanged } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })
export class GlobalClientsInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		private apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService
	) {
		super(apollo, httpLink);
	}

	init() {
		this.authSrv.authState$.pipe(
			filter(authState => authState.authenticated),
			distinctUntilChanged((x, y) => x.authenticated === y.authenticated)
		).subscribe(authState => this.initGlobalClients(authState.token));
	}

	/** creates global and all-users clients */
	private initGlobalClients(token) {
		try {
			// 1. creating all-users client and getting the user
			this.createClient(ALL_USER_CLIENT, token);
			this.createClient(GLOBAL_CONSTANT_CLIENT, token);
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


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { Subject, Observable } from 'rxjs';
import { switchMap, takeUntil, tap, catchError, first } from 'rxjs/operators';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class GlobalDataClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService,
		protected realmServerSrv: RealmServerService
	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_DATA);
	}

	init(refreshToken: TokenState): Observable<Client> {
		this.checkNotAlreadyInit();

		const uri = `${environment.graphqlUrl}/${this.client}`;

		// when accessToken for each of those clients,
		// will wait for user authentication..
		return this.tokenSrv.getAccessToken(refreshToken, this.client).pipe(
			switchMap(token => this.createClient(uri, this.client, token)),
			tap(_ => this.apolloState.setClientReady(this.client)),
			catchError(e => this.onError(e)),
			takeUntil(this.destroyed$),
			first()
		);
	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { Subject, Observable } from 'rxjs';
import { switchMap, takeUntil, tap, catchError, first } from 'rxjs/operators';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class GlobalConstClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected tokenSrv: TokenService,
		protected httpLink: HttpLink,
		protected authSrv: AuthenticationService,
		protected realmServerSrv: RealmServerService
	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_CONSTANT);
	}

	init(refreshToken: TokenState): Observable<Client> {
		this.checkNotAlreadyInit();
		const uri = `${environment.graphqlUrl}/${this.client}`;

		// when accessToken for each of those clients,
		// will wait for user authentication..
		return this.tokenSrv.getAccessToken(this.client).pipe(
			switchMap(token => this.createClient(uri, this.client, token)),
			takeUntil(this.destroyed$),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);
	}
}


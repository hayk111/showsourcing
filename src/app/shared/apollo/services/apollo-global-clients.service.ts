import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { environment } from 'environments/environment';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { ApolloStateService } from './apollo-state.service';
import { log, LogColor } from '~utils';
import { filter, first, distinctUntilChanged, switchMap, merge, concat, combineLatest, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';

import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AuthStatus } from '~features/auth';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';



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

		// when accessToken for each of those clients,
		// will wait for user authentication..
		this.tokenSrv.getAccessToken(Client.ALL_USER).pipe(
			first()
		).subscribe(token => this.initClient(allUserUri, Client.ALL_USER, token));
		this.tokenSrv.getAccessToken(Client.GLOBAL_CONSTANT).pipe(
			first()
		).subscribe(token => this.initClient(globalConstUri, Client.GLOBAL_CONSTANT, token));
		this.tokenSrv.getAccessToken(Client.GLOBAL_DATA).pipe(
			first()
		).subscribe(token => this.initClient(globalDataUri, Client.GLOBAL_DATA, token));


		// destroy clients when unauthenticated
		this.authSrv.authStatus$.pipe(
			distinctUntilChanged(),
			filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		).subscribe(_ => {
			this.destroyClient(Client.ALL_USER);
			this.destroyClient(Client.GLOBAL_CONSTANT);
			this.destroyClient(Client.GLOBAL_DATA);
		});
	}
}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { forkJoin, Observable } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { EntityMetadata, ERM } from '~core/models';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class GlobalDataClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		protected ermSrv: ERMService,
		protected httpLink: HttpLink,
		protected realmServerSrv: RealmServerService,
		protected tokenSrv: TokenService,
	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_DATA);
	}

	init(refreshToken: TokenState): Observable<Client> {
		this.checkNotAlreadyInit();
		const userId = refreshToken.token_data.identity;
		const uri = `/${this.client}/__partial/${userId}/${this.suffix}`;

		// when accessToken for each of those clients,
		// will wait for user authentication..
		return this.tokenSrv.getAccessToken(refreshToken, uri).pipe(
			switchMap(token => this.createClient(uri, this.client, token)),
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			catchError(e => this.onError(e)),
			takeUntil(this.destroyed$),
			first()
		);
	}

	createMissingSubscription(): Observable<any> {
		const toSubSet = new Set([
			'country',
			'currency',
			'harbour',
			'incoterm',
		]);

		const newSubs = Array.from(toSubSet)
			.map((name: string) => ERM.getEntityMetadata(name))
			.map((erm: EntityMetadata) => this.ermSrv.getGlobalService(erm).openSubscription(Client.GLOBAL_DATA));
		return forkJoin(newSubs);
	}

}


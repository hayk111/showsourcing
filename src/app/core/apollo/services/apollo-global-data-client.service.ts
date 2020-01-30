import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { ERMService } from '~core/ORM/erm.service';
import { EntityMetadata, ERM } from '~core/ORM/models';
import { RealmServerService } from '~core/ORM/services/realm-server/realm-server.service';

import { ApolloStateService } from './apollo-state.service';
import { LocalStorageService } from '~core/local-storage';



@Injectable({ providedIn: 'root' })
export class GlobalDataClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected ermSrv: ERMService,
		protected httpLink: HttpLink,
		protected realmServerSrv: RealmServerService,
		protected localStorage: LocalStorageService

	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_DATA, ermSrv, localStorage);
	}

	init(realmUser: RealmUser): Observable<any> {
		this.checkNotAlreadyInit();
		const userId = realmUser.identity;
		this.path = `/${this.client}/__partial/${userId}/${this.suffix}`;
		this.setPending('initialization');

		// when accessToken for each of those clients,
		// will wait for user authentication..
		return from(this.createClient(this.path, realmUser, Client.GLOBAL_DATA)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			catchError(e => this.onError(e)),
			takeUntil(this.destroyed$),
			take(1)
		);
	}

	createMissingSubscription(): Observable<any> {
		const entities = [
			ERM.COUNTRY,
			ERM.CURRENCY,
			ERM.HARBOUR,
			ERM.INCO_TERM,
			ERM.LENGTH_UNIT,
			ERM.WEIGHT_UNIT,
		];

		return super.createMissingSubscription(entities);
	}

}


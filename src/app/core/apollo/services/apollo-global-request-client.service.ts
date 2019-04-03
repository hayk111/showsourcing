import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { from, Observable, forkJoin } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { ERM, EntityMetadata } from '~core/models';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class GlobalRequestClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		protected ermSrv: ERMService,
		protected httpLink: HttpLink,
		protected realmServerSrv: RealmServerService,
		protected tokenSrv: TokenService,
	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_REQUEST);
	}

	init(realmUser: RealmUser): Observable<any> {
		this.checkNotAlreadyInit();
		const userId = realmUser.identity;
		const path = `/${this.client}/__partial/${userId}/${this.suffix}`;
		this.setPending('initialization');
		// when accessToken for each of those clients,
		// will wait for user authentication..
		return from(this.createClient(path, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			catchError(e => this.onError(e)),
			takeUntil(this.destroyed$),
			first()
		);
	}

	createMissingSubscription(): Observable<any> {
		const toSub = [
			ERM.SUPPLIER_REQUEST,
			ERM.REQUEST_ELEMENT,
			ERM.REQUEST_REPLY,
			ERM.EXTENDED_FIELD,
			ERM.EXTENDED_FIELD_DEFINITION,
			ERM.IMAGE,
		];
		const newSubs = toSub
			.map((erm: EntityMetadata) => this.ermSrv.getGlobalService(erm).openSubscription(this.client));
		return forkJoin(newSubs);
	}

}


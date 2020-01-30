import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { from, Observable } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ERMService } from '~core/ORM/erm.service';
import { LocalStorageService } from '~core/local-storage';
import { ERM } from '~core/ORM/models';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';

import { ApolloStateService } from './apollo-state.service';




@Injectable({ providedIn: 'root' })
export class GlobalRequestClientsInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected apolloState: ApolloStateService,
		protected ermSrv: ERMService,
		protected httpLink: HttpLink,
		protected realmServerSrv: RealmServerService,
		protected localStorage: LocalStorageService
	) {
		super(apollo, httpLink, apolloState, realmServerSrv, Client.GLOBAL_REQUEST, ermSrv, localStorage);
	}

	init(realmUser: RealmUser): Observable<any> {
		this.checkNotAlreadyInit();
		const userId = realmUser.identity;
		this.path = `/${this.client}/__partial/${userId}/${this.suffix}`;
		this.setPending('initialization');
		// when accessToken for each of those clients,
		// will wait for user authentication..
		return from(this.createClient(this.path, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			catchError(e => this.onError(e)),
			takeUntil(this.destroyed$),
			first()
		);
	}

	createMissingSubscription(): Observable<any> {
		const entities = [
			ERM.SUPPLIER_REQUEST,
			ERM.REQUEST_ELEMENT,
			ERM.REQUEST_REPLY,
			ERM.EXTENDED_FIELD,
			ERM.EXTENDED_FIELD_DEFINITION,
			ERM.IMAGE,
			ERM.IMAGE_UPLOAD_REQUEST,
			ERM.ATTACHMENT,
			ERM.ATTACHMENT_UPLOAD_REQUEST,
			ERM.USER
		];
		return super.createMissingSubscription(entities);

	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { TeamService } from '~core/ORM/services';
import { ERMService } from '~core/ORM/erm.service';
import { LocalStorageService } from '~core/local-storage';
import { ERM } from '~core/ORM/models';
import { RealmServerService } from '~core/ORM/services/realm-server/realm-server.service';
import { UserService } from '~core/ORM/services/user/user.service';
import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class CentralClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected realmServerSrv: RealmServerService,
		protected teamSrv: TeamService,
		protected ermSrv: ERMService,
		protected localStorage: LocalStorageService
	) {
		super(apollo, link, apolloState, realmServerSrv, Client.CENTRAL, ermSrv, localStorage);
	}

	init(realmUser: RealmUser): Observable<any> {
		super.checkNotAlreadyInit();

		this.setPending('initialization');

		const userId = realmUser.identity;
		this.path = `/${this.client}/__partial/${userId}/${this.suffix}`;

		return from(this.createClient(this.path, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			take(1),
			catchError(e => this.onError(e))
		);
	}

	createMissingSubscription(): Observable<any> {
		// TODO uncomment when ERM's are created
		const entities = [
			ERM.COMPANY,
			// ERM.COMPANY_USER,
			ERM.IMAGE,
			// ERM.IMAGE_UPLOAD_REQUEST
			// ERM.IMAGE_URL,
			// ERM.INDUSTRY,
			ERM.INVITATION,
			// ERM.PAYING_SUBSCRIPTION,
			// ERM.SUBSCRIPTION_PLAN,
			ERM.TEAM,
			ERM.TEAM_USER,
			ERM.USER
		];
		return super.createMissingSubscription(entities);
	}

}


import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { CompanyService, ImageUploadRequestService, TeamService } from '~core/entity-services';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { UserService } from '~entity-services/user/user.service';
import { ApolloStateService } from './apollo-state.service';
import { ERMService } from '~core/entity-services/_global/erm.service';
import { EntityName, ERM } from '~core/models';



@Injectable({ providedIn: 'root' })
export class CentralClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected realmServerSrv: RealmServerService,
		protected teamSrv: TeamService,
		private ermSrv: ERMService
	) {
		super(apollo, link, apolloState, realmServerSrv, Client.CENTRAL);
	}

	init(realmUser: RealmUser): Observable<any> {
		super.checkNotAlreadyInit();

		this.setPending('initialization');

		const userId = realmUser.identity;
		const uri = `/${this.client}/__partial/${userId}/${this.suffix}`;

		return from(this.createClient(uri, realmUser, this.client)).pipe(
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
			// ERM.IMAGE_URL,
			// ERM.INDUSTRY,
			ERM.INVITATION,
			// ERM.PAYING_SUBSCRIPTION,
			// ERM.SUBSCRIPTION_PLAN,
			ERM.TEAM,
			ERM.TEAM_USER,
			ERM.USER
		];
		return forkJoin(
			entities.map(erm => this.ermSrv.getGlobalService(erm).openSubscription(this.client))
		);
	}

}


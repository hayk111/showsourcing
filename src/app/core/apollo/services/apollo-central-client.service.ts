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



@Injectable({ providedIn: 'root' })
export class CentralClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected realmServerSrv: RealmServerService,
		protected teamSrv: TeamService,
		private companySrv: CompanyService
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
		return forkJoin([
			this.companySrv.openSubscription(this.client),
		]);
	}

}


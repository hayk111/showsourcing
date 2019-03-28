import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { User as RealmUser } from 'realm-graphql-client';
import { forkJoin, from, Observable } from 'rxjs';
import { catchError, first, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { TeamService, ImageUploadRequestService, CompanyService } from '~core/entity-services';
import {
	QueryBasedSubscriptionService,
} from '~core/entity-services/query-based-subscription/query-based-subscription.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { UserService } from '~entity-services/user/user.service';

import { ApolloStateService } from './apollo-state.service';
import { Company } from '~core/models';


@Injectable({ providedIn: 'root' })
export class UserClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected authSrv: AuthenticationService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService,
		protected realmServerSrv: RealmServerService,
		protected basedSubSrv: QueryBasedSubscriptionService,
		protected teamSrv: TeamService,
		private imageUploadRequest: ImageUploadRequestService,
		private companySrv: CompanyService
	) {
		super(apollo, link, apolloState, realmServerSrv, Client.USER);
	}

	init(realmUser: RealmUser): Observable<any> {
		super.checkNotAlreadyInit();

		this.setPending('initialization');

		const userId = realmUser.identity;
		const uri = `/user/${userId}/__partial/${userId}/${this.suffix}`;

		return from(this.createClient(uri, realmUser, this.client)).pipe(
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);
	}

	createMissingSubscription(): Observable<any> {
		return forkJoin([
			this.teamSrv.openSubscription(this.client),
			this.userSrv.openSubscription(this.client),
			this.companySrv.openSubscription(this.client),
			this.imageUploadRequest.openSubscription(this.client)
		]);
	}

}


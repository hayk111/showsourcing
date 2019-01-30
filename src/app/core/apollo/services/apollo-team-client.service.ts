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
import { QueryBasedSubscriptionService } from '~core/entity-services/query-based-subscription/query-based-subscription.service';
import { RealmServerService } from '~entity-services/realm-server/realm-server.service';
import { TeamService } from '~entity-services/team/team.service';
import { Team } from '~models/team.model';

import { ApolloStateService } from './apollo-state.service';
import { ERM, EntityMetadata, QueryBasedSubscription } from '~core/models';



@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	private uri: string;

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected realmServerSrv: RealmServerService,
		protected basedSubSrv: QueryBasedSubscriptionService,
		protected ermSrv: ERMService

	) {
		super(apollo, link, apolloState, realmServerSrv, Client.TEAM);
	}

	init(refreshToken: TokenState, team: Team): Observable<Client> {
		const userId = refreshToken.token_data.identity;

		// here the user client is ready if a team is selected
		this.uri = `${team.realmPath}/__partial/${userId}/web`;

		const accessToken$ = this.tokenSrv
			.getAccessToken(refreshToken, this.uri)
			.pipe(first());

		// combine tokens & uri
		return accessToken$.pipe(
			switchMap(token => super.createClient(this.uri, this.client, token)),
			takeUntil(this.destroyed$),
			switchMap(_ => this.createMissingSubscription()),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);
	}

	createMissingSubscription(): Observable<any> {
		const toSubSet = new Set([
			'category',
			// 	'event',
			// 	'event description',
			'invitation',
			'product',
			'product status',
			'project',
			'sample',
			'sample status',
			'supplier',
			'supplier status',
			'supplier type',
			'tag',
			'task',
			'team',
			'team user',
			'user'
		]);

		const newSubs = Array.from(toSubSet)
			.map((name: string) => ERM.getEntityMetadata(name))
			.map((erm: EntityMetadata) => this.ermSrv.getGlobalService(erm).openSubscription(Client.TEAM));
		return forkJoin(newSubs);
	}

	setPending(reason: string) {
		this.tokenSrv.removeAccessToken(this.uri);
		return super.setPending(reason);
	}

}

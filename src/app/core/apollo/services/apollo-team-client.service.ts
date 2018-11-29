import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { zip, Observable } from 'rxjs';
import { first, switchMap, takeUntil, tap, catchError } from 'rxjs/operators';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { TokenService } from '~core/auth/services/token.service';
import { RealmServerService } from '~global-services/realm-server/realm-server.service';
import { TeamService } from '~global-services/team/team.service';
import { Team } from '~models/team.model';
import { AbstractApolloClient } from '~core/apollo/services/abstract-apollo-client.class';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { ApolloStateService } from './apollo-state.service';



@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		private authSrv: AuthenticationService,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected realmServerSrv: RealmServerService

	) {
		super(apollo, link, apolloState, realmServerSrv, Client.TEAM);
	}

	init(refreshToken: TokenState, team: Team): Observable<Client> {
		const userId = refreshToken.token_data.identity;

		// here the user client is ready if a team is selected
		const uri$ = this.getRealmUri(
			team.realmServerName,
			`${team.realmPath}/__partial/${userId}`
		);

		const accessToken$ = this.tokenSrv
			.getAccessToken(refreshToken, `${this.client}/${team.id}/__partial/${userId}`)
			.pipe(first());

		// combine tokens & uri
		return zip(accessToken$, uri$).pipe(
			switchMap(([token, uri]) => super.createClient(uri, this.client, token)),
			takeUntil(this.destroyed$),
			tap(_ => this.apolloState.setClientReady(this.client)),
			first(),
			catchError(e => this.onError(e))
		);

	}

}

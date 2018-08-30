import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom, switchMapTo, shareReplay, first } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { Team } from '~models/team.model';
import { ApolloStateService, ClientStatus } from './apollo-state.service';
import { log } from '~utils/log';
import { TeamService } from '~global-services/team/team.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { combineLatest, forkJoin, zip } from 'rxjs';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { Router } from '@angular/router';
import { AuthStatus } from '~features/auth';



@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		private authSrv: AuthenticationService,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected router: Router
	) {
		super(apollo, link, apolloState);
	}

	init() {

		// only a team is selected
		const teamSelected$ = this.teamSrv.selectedTeam$
			.pipe(
				distinctUntilChanged((x, y) => x.id === y.id),
				shareReplay(1)
			);

		// only when user client is ready
		const userClientReady$ = this.apolloState.getClientStatus(Client.USER).pipe(
			filter(status => status === ClientStatus.READY)
		);

		const uri$ = teamSelected$.pipe(
			distinctUntilChanged((x, y) => x.id === y.id),
			switchMap(team => this.getRealmUri(team.realmServerName, team.realmPath))
		);

		const accessToken$ = teamSelected$.pipe(
			// we need one access token per team id, ence the first
			switchMap(team => this.tokenSrv.getAccessToken(`${Client.TEAM}/${team.id}`)
				.pipe(first())
			)
		);

		// combine tokens & uri
		combineLatest(accessToken$, uri$)
			.subscribe(([token, uri]) => super.initClient(uri, Client.TEAM, token));

		// when no team selected we also destroy the client
		this.teamSrv.hasTeamSelected$.pipe(
			filter(has => !has),
		).subscribe(_ => this.destroyClient(Client.TEAM, 'no team selected'));

	}

}

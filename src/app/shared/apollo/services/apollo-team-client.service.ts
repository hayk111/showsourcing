import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { Team } from '~models/team.model';
import { ApolloStateService } from './apollo-state.service';
import { log } from '~utils/log';
import { TeamService } from '~global-services/team/team.service';
import { AbstractApolloClient } from '~shared/apollo/services/abstract-apollo-client.class';
import { combineLatest } from 'rxjs';
import { TEAM_CLIENT } from '~shared/apollo/services/apollo-client-names.const';



@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService
	) {
		super(apollo, link, apolloState);
	}

	init() {
		// when there is a refreshToken and the user has selected a team we initialize the team client
		const accessToken$ = this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.getAccessToken(token, TEAM_CLIENT))
		);

		// get realm uri from the team selected.
		const uri$ = this.teamSrv.selectedTeam$.pipe(
			filter(team => !!team),
			distinctUntilChanged((x, y) => x.id === y.id),
			switchMap(team => this.getRealmUri(team.realmServerName, team.realmPath))
		);

		combineLatest(uri$, accessToken$)
			.subscribe(([uri, tokenState]) => this.initClient(uri, tokenState.token, TEAM_CLIENT));

		// when no token we destroy team client
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !token)
		).subscribe(authenticated => this.destroyClient(TEAM_CLIENT));

		// when no team selected we also destroy the client
		this.teamSrv.hasTeamSelected$.pipe(
			filter(has => !has),
		).subscribe(_ => this.destroyClient(TEAM_CLIENT, 'no team selected'));

	}

}

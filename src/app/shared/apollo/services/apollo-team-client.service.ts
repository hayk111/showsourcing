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


@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloClient {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService
	) {
		super(apollo, link);
	}

	init() {
		// when there is a refreshToken and the user has selected a team we initialize the team client
		const accessToken$ = this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !!token),
			// first we need to get an accessToken
			switchMap(token => this.tokenSrv.getAccessToken(token, 'TEAM'))
		);

		// get realm uri from the team selected.
		const uri$ = this.teamSrv.selectedTeam$.pipe(
			filter(team => !!team),
			distinctUntilChanged((x, y) => x.id === y.id),
			switchMap(team => this.getRealmUri(team.realmServerName, team.realmPath))
		);

		combineLatest(uri$, accessToken$)
			.subscribe(([uri, tokenState]) => this.initTeamClient(uri, tokenState.token));

		// when authenticated we start team client
		this.tokenSrv.refreshToken$.pipe(
			distinctUntilChanged(),
			filter(token => !token)
		).subscribe(authenticated => this.resetClient());

	}

	/** initialize apollo team client */
	private async initTeamClient(uri: string, token) {
		try {
			this.createClient(uri, undefined, token);
			this.apolloState.setTeamClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setTeamClientNotReady();
		}
	}

	private resetClient() {
		super.clearClient();
		this.apolloState.resetTeamClient();
	}

}

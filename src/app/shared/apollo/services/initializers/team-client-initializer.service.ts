import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { Team } from '~models/team.model';
import { ApolloStateService } from './apollo-state.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-apollo-initializer.class';
import { log } from '~utils/log';
import { TeamService } from '~global-services/team/team.service';


@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		protected link: HttpLink,
		protected tokenSrv: TokenService,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		protected teamSrv: TeamService
	) {
		super(apollo, link);
	}

	init() {
		// when the user has selected a team we initialize the team client
		this.teamSrv.selectedTeam$
			.pipe(
				distinctUntilChanged((x, y) => undefined ? x.id === y.id : undefined),
				// filter has to be after distinct because of the check above
				filter(t => !!t),
				switchMap(team => this.getRealmUri(team.realmServerName, team.realmPath))
			).subscribe(uri => this.initTeamClient(uri, this.tokenSrv.accessTokenSync.token));

		// when authenticated we start team client
		this.authSrv.authState$.pipe(
			map(authState => authState.authenticated),
			filter(authenticated => !authenticated)
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

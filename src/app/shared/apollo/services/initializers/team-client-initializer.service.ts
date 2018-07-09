import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { TokenService } from '~features/auth';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TeamService } from '~global-services';
import { Team } from '~models/team.model';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { AbstractInitializer } from '~shared/apollo/services/initializers/abstract-initializer.class';
import { log } from '~utils/log';


@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractInitializer {

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		private teamSrv: TeamService
	) {
		super(apollo, tokenSrv, link, authSrv, true);
	}

	init() {
		// when the the user has selected a team we initialize the team client
		this.teamSrv.selectedTeam$
			.pipe(
				// if the team is null then we should do nothing because we are already redirecting in getSelectedTeam
				filter(t => !!t),
				distinctUntilChanged((x, y) => x.id === y.id)
			).subscribe(team => this.initTeamClient(team));
	}

	/** initialize apollo team client */
	private async initTeamClient(team: Team) {
		try {
			// we first clear the last team picked cache
			this.clearClient();
			const realm = await this.getRealm(team.realmServerName);
			const uris = this.getUris(realm.httpsPort, realm.hostname, team.realmPath);
			this.createClient(uris.httpUri, uris.wsUri);
			this.apolloState.setTeamClientReady();
		} catch (e) {
			log.error(e);
			this.apolloState.setTeamClientNotReady();
		}
	}

}

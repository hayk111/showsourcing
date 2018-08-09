import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { TokenService } from '~features/auth/services/token.service';
import { Team } from '~models/team.model';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { AbstractApolloInitializer } from '~shared/apollo/services/initializers/abstract-apollo-initializer.class';
import { log } from '~utils/log';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';


@Injectable({ providedIn: 'root' })
export class TeamClientInitializer extends AbstractApolloInitializer {

	constructor(
		protected apollo: Apollo,
		protected tokenSrv: TokenService,
		protected link: HttpLink,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService,
		protected teamPicker: TeamPickerService
	) {
		super(apollo, tokenSrv, link, authSrv, true);
	}

	init() {
		// when the the user has selected a team we initialize the team client
		this.teamPicker.selectedTeam$
			.pipe(
				filter(t => !!t),
				distinctUntilChanged((x, y) => x.id === y.id),
				switchMap(team => this.getRealmUri(team.realmServerName, team.realmPath))
			).subscribe(uri => this.initTeamClient(uri));

		// when authenticated we start user client
		this.authSrv.authState$.pipe(
			map(authState => authState.authenticated),
			filter(authenticated => !authenticated)
		).subscribe(authenticated => this.resetClient());
	}


	/** initialize apollo team client */
	private async initTeamClient(uri: string) {
		try {
			this.createClient(uri);
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

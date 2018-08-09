import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { Team } from '~models';
import { USER_CLIENT } from '~shared/apollo/services/initializers/client-names.const';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamQueries } from '~global-services/team/team.queries';
import { TeamPickerService } from '~features/pick-a-team/services/team-picker.service';
import { log } from '~utils';


/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	constructor(
		protected wrapperTemp: ApolloWrapper,
		protected apolloState: ApolloStateService,
		private teamPicker: TeamPickerService
	) {
		super(wrapperTemp.use(USER_CLIENT), new TeamQueries(), 'Team');
		log.debug('team service constructor');
	}


	/** creates a team and waits for it to be valid */
	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitTeamValid(team)),
			tap(_ => this.pickTeam(team))
		);
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): Observable<Team> {
		return this.teamPicker.pickTeam(team);
	}

	get hasTeamSelected$(): Observable<boolean> {
		return this.teamPicker.selectedTeam$.pipe(
			map(team => !!team)
		);
	}

	selectTeam() {
		return this.teamPicker.selectedTeam$;
	}

	/** waits for a team to go from pending to active */
	private waitTeamValid(team: Team) {
		return this.selectMany(
			of(
				new SelectParams({ query: `id == "${team.id}" AND status == "active"` })
			)
		).pipe(
			map(teams => teams[0]),
			filter(teamCreated => !!teamCreated)
		);
	}


}

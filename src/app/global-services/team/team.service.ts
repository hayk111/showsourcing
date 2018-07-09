import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Team } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { USER_CLIENT } from '~shared/apollo/services/apollo-endpoints.const';

import { GlobalService } from '../_global/global.service';
import { TeamQueries } from './team.queries';
import { TeamClientInitializer } from '~shared/apollo/services/initializers/team-client-initializer.service';


/**
 * Team service. At the start of the application it deals with
 * retrieving the current selected team.
 */
@Injectable({ providedIn: 'root' })
export class TeamService extends GlobalService<Team> {

	constructor(
		wrapper: ApolloWrapper,
		protected teamClient: TeamClientInitializer
	) {
		super(wrapper.use(USER_CLIENT), new TeamQueries(), 'Team');
	}


	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitTeamValid(team)),
			tap(_ => this.pickTeam(team))
		);
	}

	/** waits for a team to go from pending to active */
	private waitTeamValid(team: Team) {
		return this.wrapper.use(USER_CLIENT).selectMany({
			gql: this.queries.list,
			query: `id == "${team.id}" AND status == "active"`
		});
	}

	/** picks a team, puts the selection in local storage */
	pickTeam(team: Team): void {
		this.teamClient.pickTeam(team);
	}

	get hasTeam$(): Observable<boolean> {
		return this.teamClient.selectedTeam$.pipe(
			map(team => !!team)
		);
	}

}

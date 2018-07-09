import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Team } from '~models';
import { GqlClient } from '~shared/apollo/services/gql-client.service';
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
		protected gqlClient: GqlClient,
		protected teamClient: TeamClientInitializer
	) {
		super(gqlClient.use(USER_CLIENT), new TeamQueries(), 'Team');
		debugger;
	}


	create(team: Team): Observable<any> {
		return super.create(team).pipe(
			switchMap(_ => this.waitTeamValid(team)),
			tap(_ => this.pickTeam(team))
		);
	}

	/** waits for a team to go from pending to active */
	private waitTeamValid(team: Team) {
		return this.gqlClient.use(USER_CLIENT).selectMany({
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

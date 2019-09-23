import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { TeamUserQueries } from '~entity-services/team-user/team-user.queries';
import { GlobalService } from '~entity-services/_global/global.service';
import { TeamUser } from '~models';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(
		protected apolloState: ApolloStateService,
		protected http: HttpClient,
		protected teamSrv: TeamService,
		protected userSrv: UserService
	) {
		super(apolloState, TeamUserQueries, 'teamUser', 'teamUsers');
	}

	update(teamUser: TeamUser) {
		const teamId = this.teamSrv.selectedTeamSync.id;
		debugger;
		return this.http.patch<TeamUser>(`api/team/${teamId}/user/${teamUser.user.id}/team-role`, teamUser);
	}

	updateMany(teamUsers: TeamUser[]) {
		return forkJoin(teamUsers.map(tu => this.update(tu)));
	}
}

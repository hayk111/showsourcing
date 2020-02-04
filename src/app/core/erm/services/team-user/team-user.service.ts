import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { TeamUserQueries } from '~core/erm/services/team-user/team-user.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { TeamUser } from '~core/erm/models';
import { TeamService } from '../team/team.service';
import { UserService } from '../user/user.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	defaultClient = Client.CENTRAL;

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
		return this.http.patch<TeamUser>(`api/team/${teamId}/user/${teamUser.user.id}/team-role`, teamUser);
	}

	updateMany(teamUsers: TeamUser[]) {
		return forkJoin(teamUsers.map(tu => this.update(tu)));
	}
}

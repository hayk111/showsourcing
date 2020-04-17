import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

import { TeamUserQueries } from '~core/erm/services/team-user/team-user.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { TeamUser } from '~core/erm/models';
import { UserService, TeamService } from '~core/auth';



@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(
		protected http: HttpClient,
		protected teamSrv: TeamService,
		protected userSrv: UserService
	) {
		super(TeamUserQueries, 'teamUser', 'teamUsers');
	}

	update(teamUser: TeamUser) {
		const teamId = this.teamSrv.teamSelected$;
		return this.http.patch<TeamUser>(`api/team/${teamId}/user/${teamUser.user.id}/team-role`, teamUser);
	}

	updateMany(teamUsers: TeamUser[]) {
		return forkJoin(teamUsers.map(tu => this.update(tu)));
	}
}

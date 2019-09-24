import { Injectable } from '@angular/core';
import { zip, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { TeamService, TeamUserService, UserService } from '~entity-services';
import { HttpClient } from '@angular/common/http';
import { TeamUser } from '~core/models';

@Injectable({ providedIn: 'root' })
export class SettingsMembersService extends TeamUserService {

	constructor(
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected userSrv: UserService,
		protected http: HttpClient
	) {
		super(apolloState, http, teamSrv, userSrv);
	}

	selectTeamOwner() {
		return zip(
			this.userSrv.selectUser(),
			this.teamSrv.teamSelectedTeamRealm$
		).pipe(
			map(([user, team]) => {
				return {
					teamOwner: (team && team.ownerUser && team.ownerUser.id === user.id),
					user
				};
			})
		);
	}

	updateAccessType(accessType, userId) {
		const teamId = this.teamSrv.selectedTeamSync.id;
		return this.http.patch<TeamUser>(`api/team/${teamId}/user/${userId}/team-role`, { accessType });
	}

}

import { Injectable } from '@angular/core';
import { zip, Subject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { TeamService, TeamUserService, UserService } from '~core/erm';
import { HttpClient } from '@angular/common/http';
import { TeamUser } from '~core/erm';
import { Invitation } from '~core/erm';

@Injectable({ providedIn: 'root' })
export class SettingsMembersService extends TeamUserService {

	invitationAdd$ = new Subject<any>();

	constructor(
		
		protected teamSrv: TeamService,
		protected userSrv: UserService,
		protected http: HttpClient
	) {
		super(http, teamSrv, userSrv);
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

	createInvitation(email: string) {
		const payload = { email, accessType: 'TeamMember', inviter: this.userSrv.userSync };

		this.invitationAdd$.next(of(new Invitation(payload)));
		return of(new Invitation(payload));

		// return this.http.post(`api/invitation/team/${this.teamSrv.idSync}`, payload);
	}

}

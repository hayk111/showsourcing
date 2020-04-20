import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of, Subject, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Invitation, TeamUser, TeamUserService } from '~core/erm';
import { UserService, TeamService } from '~core/auth';

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
			this.userSrv.user$,
			this.teamSrv.teamSelected$
		).pipe(
			map(([user, team]) => {
				return {
					teamOwner: (team && team.ownerUserId && team.ownerUserId === user.id),
					user
				};
			})
		);
	}

	updateAccessType(accessType, userId) {
		const teamId = TeamService.teamSelected.id;
		return this.http.patch<TeamUser>(`api/team/${teamId}/user/${userId}/team-role`, { accessType });
	}

	createInvitation(email: string) {
		const payload = { email, accessType: 'TeamMember', inviter: UserService.user };

		this.invitationAdd$.next(of(new Invitation(payload)));
		return of(new Invitation(payload));

		// return this.http.post(`api/invitation/team/${this.teamSrv.idSync}`, payload);
	}

}

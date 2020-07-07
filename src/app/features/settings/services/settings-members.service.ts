import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService, UserService } from '~core/auth';
import { TeamUser, TeamUserService } from '~core/erm';

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
					teamOwner: (team && team.owner && team.owner.id === user.id),
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

		// commenting this because of build errors

		// this.invitationAdd$.next(of(new Invitation(payload)));
		// return of(new Invitation(payload));

		// return this.http.post(`api/invitation/team/${this.teamSrv.idSync}`, payload);
	}

}

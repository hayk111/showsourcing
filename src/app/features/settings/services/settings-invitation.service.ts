import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { InvitationService, TeamService, UserService } from '~entity-services';

@Injectable({ providedIn: 'root' })
export class SettingsInvitationService extends InvitationService {

	constructor(
		protected apolloState: ApolloStateService,
		private teamSrv: TeamService,
		protected userSrv: UserService,
		protected http: HttpClient
	) {
		super(apolloState);
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

	getInviter() {
		return this.userSrv.selectUser();
	}

	createInvitation(email: string) {
		const payload = { email, accessType: 'TeamMember' };
		return this.http.post(`team/${this.teamSrv.idSync}/invitation`, payload);
	}
}

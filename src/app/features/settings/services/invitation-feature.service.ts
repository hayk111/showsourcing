import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { InvitationService, UserService, TeamService } from '~entity-services';
import { Invitation } from '~models';
import { zip } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvitationFeatureService extends InvitationService {

	constructor(
		protected apolloState: ApolloStateService,
		private invitationSrv: InvitationService,
		private teamSrv: TeamService,
		protected userSrv: UserService
	) {
		super(apolloState);
	}

	selectTeamOwner() {
		return zip(
			this.userSrv.selectUser(),
			this.teamSrv.teamSelectedTeam$
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
		return this.getInviter().pipe(
			switchMap(inviter => {
				return this.invitationSrv.create(new Invitation({
					email, inviter: { id: inviter.id }, accessType: 'TeamMember'
				}));
			})
		);
	}
}

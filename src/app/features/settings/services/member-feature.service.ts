import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { TeamService, TeamUserService, UserService } from '~entity-services';

@Injectable({ providedIn: 'root' })
export class MemberFeatureService extends TeamUserService {

	constructor(
		protected apolloState: ApolloStateService,
		private teamSrv: TeamService,
		protected userSrv: UserService) {
		super(apolloState);
	}

	selectTeamOwner() {
		return zip(
			this.userSrv.selectUser(),
			this.teamSrv.teamSelected$
		).pipe(
			map(([user, team]) => {
				return {
					teamOwner: (team && team.ownerUser && team.ownerUser.id === user.id),
					user
				};
			})
		);
	}

	updateAccessType(members) {
		return this.updateMany(members);
	}

}

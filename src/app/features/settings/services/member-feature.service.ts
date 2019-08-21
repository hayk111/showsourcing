import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { TeamService, TeamUserService, UserService } from '~entity-services';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MemberFeatureService extends TeamUserService {

	constructor(
		protected apolloState: ApolloStateService,
		protected teamSrv: TeamService,
		protected userSrv: UserService,
		protected http: HttpClient
	) {
		super(apolloState, http, teamSrv);
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

	updateAccessType(members) {
		return this.updateMany(members);
	}

}

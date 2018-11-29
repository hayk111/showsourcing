import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, zip } from 'rxjs';
import { TeamUser } from '~models';

import { TeamUserService, TeamService, UserService } from '~entity-services';
import { SelectParams } from '~entity-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { Apollo } from 'apollo-angular';
import { first, map } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';

@Injectable()
export class MemberFeatureService extends TeamUserService {

	constructor(
		protected apolloState: ApolloStateService,
		private teamUserSrv: TeamUserService,
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

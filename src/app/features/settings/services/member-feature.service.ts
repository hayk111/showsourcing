import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, zip } from 'rxjs';
import { TeamUser } from '~models';

import { TeamUserService, TeamService, UserService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { first, map } from 'rxjs/operators';

@Injectable()
export class MemberFeatureService extends TeamUserService {

	constructor(
		protected apollo: ApolloWrapper,
		private teamUserSrv: TeamUserService,
		private teamSrv: TeamService,
		private userSrv: UserService) {
		super(apollo);
	}

	selectTeamOwner() {
		return zip(
			this.userSrv.selectUser(),
			this.teamSrv.selectTeam()
		).pipe(
			map(values => {
				const [user, team] = values;
				return {
					teamOwner: (team.ownerUser && team.ownerUser.id === user.id),
					user
				};
			})
		);
	}

}

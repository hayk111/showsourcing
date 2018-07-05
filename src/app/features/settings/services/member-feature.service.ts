import { Injectable } from '@angular/core';
import { Observable, of, forkJoin, zip } from 'rxjs';
import { TeamUser } from '~models';

import { TeamUserService, TeamService, UserService } from '../../../global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloClient } from '~shared/apollo';
import { first, map } from 'rxjs/operators';

@Injectable()
export class MemberFeatureService extends TeamUserService {

	constructor(
		protected apollo: ApolloClient,
		private teamUserSrv: TeamUserService,
		private teamSrv: TeamService,
		private userSrv: UserService) {
		super(apollo);
	}

	selectTeamOwner() {
		return zip(
			this.userSrv.user$.pipe(first()),
			this.teamSrv.selectedTeam$.pipe(first())
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

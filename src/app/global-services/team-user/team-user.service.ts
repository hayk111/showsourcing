import { Injectable } from '@angular/core';
import { TeamUser } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamUserQueries } from '~global-services/team-user/team-user.queries';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, TeamUserQueries, 'teamUser', 'teamUsers');
	}

}

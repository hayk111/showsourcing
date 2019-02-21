import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { TeamUserQueries } from '~entity-services/team-user/team-user.queries';
import { TeamUser } from '~models';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, TeamUserQueries, 'teamUser', 'teamUsers');
	}

}

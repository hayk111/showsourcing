import { Injectable } from '@angular/core';
import { TeamUser } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamUserQueries } from '~global-services/team-user/team-user.queries';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new TeamUserQueries(), 'TeamUser');
	}

	selectAll(fields: string = 'id, user { id, firstName, lastName, email }') {
		return super.selectAll(fields);
	}
}

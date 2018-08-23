import { Injectable } from '@angular/core';
import { TeamUser } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { TeamUserQueries } from '~global-services/team-user/team-user.queries';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(wrapper: ApolloWrapper) {
		super(apollo, new TeamUserQueries(), 'TeamUser');
	}

	selectAll(fields: string = 'id, user { id, firstName, lastName, email }') {
		return super.selectAll(fields);
	}
}

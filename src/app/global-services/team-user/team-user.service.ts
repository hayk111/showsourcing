import { Injectable } from '@angular/core';
import { TeamUser } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { TeamUserQueries } from './team-user.queries';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new TeamUserQueries(), 'TeamUser');
	}

	selectAll(fields: string = 'id, firstName, lastName') {
		return super.selectAll(fields);
	}
}

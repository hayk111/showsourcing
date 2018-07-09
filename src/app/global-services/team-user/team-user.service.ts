import { Injectable } from '@angular/core';
import { TeamUser } from '~models';
import { GqlClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { TeamUserQueries } from './team-user.queries';


@Injectable({
	providedIn: 'root'
})
export class TeamUserService extends GlobalService<TeamUser> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new TeamUserQueries(), 'TeamUser');
	}

	selectAll(fields: string = 'id, user { id, firstName, lastName }') {
		return super.selectAll(fields);
	}
}

import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { TeamRequest } from '~models';
import { TeamRequestQueries } from './team-request.queries';



@Injectable({ providedIn: 'root' })
export class TeamRequestService extends GlobalService<TeamRequest> {

	constructor(
		protected apolloState: ApolloStateService,
	) {
		super(apolloState, TeamRequestQueries, 'request', 'requests');
	}

}

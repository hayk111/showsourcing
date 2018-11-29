import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';

import { GlobalServiceInterface, GlobalService } from '~entity-services/_global/global.service';
import { EventQueries } from '~entity-services/event/event.queries';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, EventQueries, 'event', 'events', userSrv);
	}

}

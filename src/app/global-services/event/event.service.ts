import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';

import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { EventQueries } from '~global-services/event/event.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, EventQueries, 'event', 'events', userSrv);
	}

}

import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { EventQueries } from '~entity-services/event/event.queries';
import { UserService } from '~entity-services/user/user.service';
import { Event } from '~models';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, EventQueries, 'event', 'events', userSrv);
	}

}

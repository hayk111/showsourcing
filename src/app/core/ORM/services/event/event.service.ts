import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { EventQueries } from '~core/ORM/services/event/event.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { Event } from '~core/ORM/models';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, EventQueries, 'event', 'events', userSrv);
	}

}

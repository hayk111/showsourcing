import { Injectable } from '@angular/core';
import { Event } from '~core/erm/models';
import { EventQueries } from '~core/erm/services/event/event.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(protected userSrv: UserService) {
		super(EventQueries, 'event', 'events', userSrv);
	}

}

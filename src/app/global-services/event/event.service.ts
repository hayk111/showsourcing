import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { EventQueries } from '~global-services/event/event.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalWithAuditService<Event> {

	constructor(apollo: Apollo protected userSrv: UserService) {
		super(wrapper, new EventQueries(), 'Event', userSrv);
	}

	selectAll(fields: string = 'id, name, description {id, name, startDate, endDate}') {
		return super.selectAll(fields);
	}

}

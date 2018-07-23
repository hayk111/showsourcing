import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { EventQueries } from '~global-services/event/event.queries';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalService<Event> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new EventQueries(), 'Event');
	}

	selectAll(fields: string = 'id, name, description {id, name, startDate, endDate}') {
		return super.selectAll(fields);
	}

}

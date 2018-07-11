import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';
import { ApolloWrapper } from '~shared/apollo';

import { GlobalServiceInterface, GlobalService } from '../_global/global.service';
import { EventQueries } from './event.queries';


@Injectable({
	providedIn: 'root'
})
export class EventService extends GlobalService<Event> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new EventQueries(), 'Event');
	}

	selectAll(fields: string = 'id, alias') {
		return super.selectAll(fields);
	}

}

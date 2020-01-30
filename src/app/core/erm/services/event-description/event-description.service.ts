import { Injectable } from '@angular/core';
import { EventDescription } from '~core/erm/models';
import { EventDescriptionQueries } from '~core/erm/services/event-description/event-description.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor() {
		super(EventDescriptionQueries, 'eventDescription', 'eventDescriptions');
	}

}

import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~core/ORM/services/_global/global.service';
import { Observable } from 'rxjs';
import { EventDescriptionQueries } from '~core/ORM/services/event-description/event-description.queries';
import { EventDescription } from '~core/ORM/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, EventDescriptionQueries, 'eventDescription', 'eventDescriptions');
	}

}

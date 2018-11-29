import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { EventDescriptionQueries } from '~global-services/event-description/event-description.queries';
import { EventDescription } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, EventDescriptionQueries, 'eventDescription', 'eventDescriptions');
	}

}

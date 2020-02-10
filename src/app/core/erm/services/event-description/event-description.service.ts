import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~core/erm/services/_global/global.service';
import { Observable } from 'rxjs';
import { EventDescriptionQueries } from '~core/erm/services/event-description/event-description.queries';
import { EventDescription } from '~core/erm/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, EventDescriptionQueries, 'eventDescription', 'eventDescriptions');
	}

}

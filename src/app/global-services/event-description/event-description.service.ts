import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { EventDescriptionQueries } from '~global-services/event-description/event-description.queries';
import { Apollo } from 'apollo-angular';
import { EventDescription } from '~models';
import { ApolloStateService } from '~shared/apollo';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, EventDescriptionQueries, 'eventDescription', 'eventDescriptions');
	}

}

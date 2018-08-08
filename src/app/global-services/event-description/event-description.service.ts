import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { EventDescriptionQueries } from '~global-services/event-description/event-description.queries';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { EventDescription } from '~models';


@Injectable({ providedIn: 'root' })
export class EventDescriptionService extends GlobalService<EventDescription> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new EventDescriptionQueries(), 'EventDescription');
	}

}

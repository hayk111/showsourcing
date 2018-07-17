import { Injectable } from '@angular/core';
import { EventService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

@Injectable({
	providedIn: 'root'
})
export class EventManagementService extends EventService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}

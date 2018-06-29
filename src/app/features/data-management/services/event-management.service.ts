import { Injectable } from '@angular/core';
import { EventService } from '~global-services';
import { ApolloClient } from '~shared/apollo';

@Injectable()
export class EventManagementService extends EventService {

	constructor(protected apollo: ApolloClient) {
		super(apollo);
	}
}

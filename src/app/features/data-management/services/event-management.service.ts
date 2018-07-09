import { Injectable } from '@angular/core';
import { EventService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo';

@Injectable()
export class EventManagementService extends EventService {

	constructor(protected wrapper: ApolloWrapper) {
		super(wrapper);
	}
}

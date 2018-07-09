import { Injectable } from '@angular/core';
import { EventService } from '~global-services';
import { GqlClient } from '~shared/apollo';

@Injectable()
export class EventManagementService extends EventService {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient);
	}
}

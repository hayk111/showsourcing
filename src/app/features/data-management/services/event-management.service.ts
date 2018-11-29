import { Injectable } from '@angular/core';
import { EventService, UserService } from '~entity-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({
	providedIn: 'root'
})
export class EventManagementService extends EventService {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, userSrv);
	}
}

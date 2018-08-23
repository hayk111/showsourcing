import { Injectable } from '@angular/core';
import { EventService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';

@Injectable({
	providedIn: 'root'
})
export class EventManagementService extends EventService {

	constructor(protected apollo: Apollo, protected userSrv: UserService) {
		super(apollo, userSrv);
	}
}

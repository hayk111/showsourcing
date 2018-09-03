import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Invitation } from '~models';

import { InvitationService, UserService } from '~global-services';
import { Apollo } from 'apollo-angular';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

@Injectable()
export class InvitationFeatureService extends InvitationService {

	constructor(
		protected apollo: Apollo,
		private invitationSrv: InvitationService,
		protected userSrv: UserService
	) {
		super(apollo);
	}

	getInvitation(id: string) {
		// try to find first the inviation into USER
		return this.selectOne(id, null, Client.USER).pipe(
			switchMap(invitation => {
				if (invitation && invitation.id) { // if an invitation is found, return it
					return of({ invitation, client: Client.USER });
				} else { // if no invitation found, try to find it into ALL_USER
					return this.selectOne(id, null, Client.ALL_USER).pipe(
						map(invit => ({ invitation: invit, client: Client.ALL_USER }))
					);
				}
			})
		);
	}

	acceptInvitation(id: string, client: Client) {
		return this.invitationSrv.update({
			id,	status: 'accepted'
		}, null, client);
	}

	refuseInvitation(id: string, client: Client) {
		return this.invitationSrv.delete(id, client);
	}

}

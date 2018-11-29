import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Invitation } from '~models';

import { InvitationService, UserService } from '~entity-services';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo';

@Injectable()
export class InvitationFeatureService extends InvitationService {

	constructor(
		protected apolloState: ApolloStateService,
		private invitationSrv: InvitationService,
		protected userSrv: UserService
	) {
		super(apolloState);
	}

	getInviter() {
		return this.userSrv.selectUser();
	}

	createInvitation(email: string) {
		return this.getInviter().pipe(
			switchMap(inviter => {
				return this.invitationSrv.create(new Invitation({
					email, inviter: { id: inviter.id }, accessType: 'FullAccess'
				}));
			})
		);
	}
}

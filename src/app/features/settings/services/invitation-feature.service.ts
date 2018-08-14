import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Invitation } from '~models';

import { InvitationService, UserService } from '~global-services';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

@Injectable()
export class InvitationFeatureService extends InvitationService {

	constructor(
		protected apollo: ApolloWrapper,
		private invitationSrv: InvitationService,
		protected userSrv: UserService
	) {
		super(apollo);
	}

	getInviter() {
		return this.userSrv.selectUser();
	}

	createInvitation(email: string) {
		return this.getInviter().pipe(
			switchMap(inviter => {
				inviter = { ...inviter };
				delete inviter.realmServerName;
				delete inviter.realmPath;
				return this.invitationSrv.create(new Invitation({ email, inviter }));
			})
		);
	}
}

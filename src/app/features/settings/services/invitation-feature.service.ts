import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { InvitationService, UserService } from '~entity-services';
import { Invitation } from '~models';

@Injectable({ providedIn: 'root' })
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
					email, inviter: { id: inviter.id }, accessType: 'TeamMember'
				}));
			})
		);
	}
}

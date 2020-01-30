import { Injectable } from '@angular/core';
import { InvitationUser } from '~core/erm/models';
import { InvitationUserQueries } from '~core/erm/services/invitation-user/invitation-user.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';


@Injectable({ providedIn: 'root' })
export class InvitationUserService extends GlobalService<InvitationUser> {

	constructor() {
		super(InvitationUserQueries, 'invitation', 'invitations');
	}

}

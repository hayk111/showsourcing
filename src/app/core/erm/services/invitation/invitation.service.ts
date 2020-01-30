import { Injectable } from '@angular/core';
import { Invitation } from '~core/erm/models';
import { InvitationQueries } from '~core/erm/services/invitation/invitation.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {

	constructor() {
		super(InvitationQueries, 'invitation', 'invitations');
	}
}

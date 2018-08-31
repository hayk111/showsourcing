import { Injectable } from '@angular/core';
import { Invitation } from '~models';
import { Apollo } from 'apollo-angular';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { GlobalService } from '~global-services/_global/global.service';
import { InvitationQueries } from '~global-services/invitation/invitation.queries';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {

	constructor(protected apollo: Apollo) {
		super(apollo, InvitationQueries, 'invitation', 'invitations');
	}

	update(entity: any, fields?: string | string[], client?: Client) {
		return super.update(entity, fields, client);
	}
}

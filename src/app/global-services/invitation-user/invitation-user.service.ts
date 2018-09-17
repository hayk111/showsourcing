import { Injectable } from '@angular/core';
import { InvitationUser } from '~models';
import { Apollo } from 'apollo-angular';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

import { GlobalService } from '~global-services/_global/global.service';
import { InvitationUserQueries } from '~global-services/invitation-user/invitation-user.queries';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class InvitationUserService extends GlobalService<InvitationUser> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationUserQueries, 'invitation', 'invitations');
	}

	update(entity: any, fields?: string | string[], client?: Client) {
		return super.update(entity, fields, client);
	}
}

import { Injectable } from '@angular/core';
import { InvitationUser } from '~models';
import { Apollo } from 'apollo-angular';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { GlobalService } from '~entity-services/_global/global.service';
import { InvitationUserQueries } from '~entity-services/invitation-user/invitation-user.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class InvitationUserService extends GlobalService<InvitationUser> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationUserQueries, 'invitation', 'invitations');
	}

}

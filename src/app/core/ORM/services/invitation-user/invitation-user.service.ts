import { Injectable } from '@angular/core';
import { InvitationUser } from '~core/orm/models';
import { Apollo } from 'apollo-angular';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { GlobalService } from '~core/orm/services/_global/global.service';
import { InvitationUserQueries } from '~core/orm/services/invitation-user/invitation-user.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class InvitationUserService extends GlobalService<InvitationUser> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationUserQueries, 'invitation', 'invitations');
	}

}

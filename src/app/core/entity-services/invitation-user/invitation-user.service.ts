import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';
import { InvitationUserQueries } from '~entity-services/invitation-user/invitation-user.queries';
import { InvitationUser } from '~models';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class InvitationUserService extends GlobalService<InvitationUser> {
	defaultClient = Client.CENTRAL;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationUserQueries, 'invitation', 'invitations');
	}

}

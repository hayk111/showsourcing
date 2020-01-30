import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/ORM/services/_global/global.service';
import { InvitationQueries } from '~core/ORM/services/invitation/invitation.queries';
import { Invitation } from '~core/ORM/models';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {
	defaultClient = Client.CENTRAL;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationQueries, 'invitation', 'invitations');
	}
}

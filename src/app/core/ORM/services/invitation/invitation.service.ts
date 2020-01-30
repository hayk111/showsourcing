import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/orm/services/_global/global.service';
import { InvitationQueries } from '~core/orm/services/invitation/invitation.queries';
import { Invitation } from '~core/orm/models';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {
	defaultClient = Client.CENTRAL;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationQueries, 'invitation', 'invitations');
	}
}

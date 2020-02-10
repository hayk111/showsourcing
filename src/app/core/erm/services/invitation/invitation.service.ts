import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/erm/services/_global/global.service';
import { InvitationQueries } from '~core/erm/services/invitation/invitation.queries';
import { Invitation } from '~core/erm/models';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {
	defaultClient = Client.CENTRAL;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationQueries, 'invitation', 'invitations');
	}
}

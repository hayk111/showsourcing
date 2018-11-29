import { Injectable } from '@angular/core';
import { Invitation } from '~models';
import { Apollo } from 'apollo-angular';
import { Client } from '~core/apollo/services/apollo-client-names.const';

import { GlobalService } from '~global-services/_global/global.service';
import { InvitationQueries } from '~global-services/invitation/invitation.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, InvitationQueries, 'invitation', 'invitations');
	}
}

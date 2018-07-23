import { Injectable } from '@angular/core';
import { Invitation } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { InvitationQueries } from '~global-services/invitation/invitation.queries';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {

	constructor(protected apollo: ApolloWrapper) {
		super(apollo, new InvitationQueries(), 'Invitation');
	}

}

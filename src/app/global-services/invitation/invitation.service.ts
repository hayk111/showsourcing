import { Injectable } from '@angular/core';
import { Invitation } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { InvitationQueries } from './invitation.queries';

@Injectable({ providedIn: 'root' })
export class InvitationService extends GlobalService<Invitation> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new InvitationQueries(), 'Invitation');
	}

}

import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { ContactQueries } from '~entity-services/contact/contact.queries';
import { UserService } from '~entity-services/user/user.service';
import { Contact } from '~models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalWithAuditService<Contact> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ContactQueries, 'contact', 'contacts', userSrv);
	}

}

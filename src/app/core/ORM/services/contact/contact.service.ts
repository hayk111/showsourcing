import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { ContactQueries } from '~core/ORM/services/contact/contact.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { Contact } from '~core/ORM/models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalWithAuditService<Contact> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ContactQueries, 'contact', 'contacts', userSrv);
	}

}

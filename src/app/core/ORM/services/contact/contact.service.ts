import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/orm/services/_global/global-with-audit.service';
import { ContactQueries } from '~core/orm/services/contact/contact.queries';
import { UserService } from '~core/orm/services/user/user.service';
import { Contact } from '~core/orm/models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalWithAuditService<Contact> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ContactQueries, 'contact', 'contacts', userSrv);
	}

}

import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { ContactQueries } from '~global-services/contact/contact.queries';
import { Apollo } from 'apollo-angular';
import { Contact } from '~models';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalWithAuditService<Contact> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, ContactQueries, 'contact', 'contacts', userSrv);
	}

}

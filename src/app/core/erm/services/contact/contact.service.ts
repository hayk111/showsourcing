import { Injectable } from '@angular/core';
import { Contact } from '~core/erm/models';
import { ContactQueries } from '~core/erm/services/contact/contact.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalWithAuditService<Contact> {

	constructor(protected userSrv: UserService) {
		super(ContactQueries, 'contact', 'contacts', userSrv);
	}

}

import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '~global-services/_global/global.service';
import { Observable } from 'rxjs';
import { ContactQueries } from '~global-services/contact/contact.queries';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { Contact } from '~models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalService<Contact> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ContactQueries(), 'Contact');
	}

}

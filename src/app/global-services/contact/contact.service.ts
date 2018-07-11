import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '../_global/global.service';
import { Observable } from 'rxjs';
import { ContactQueries } from './contact.queries';
import { ApolloWrapper } from '~shared/apollo';
import { Contact } from '~models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalService<Contact> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ContactQueries(), 'Contact');
	}

}

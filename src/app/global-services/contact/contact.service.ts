import { Injectable } from '@angular/core';
import { GlobalServiceInterface, GlobalService } from '../_global/global.service';
import { Observable } from 'rxjs';
import { ContactQueries } from './contact.queries';
import { GqlClient } from '~shared/apollo';
import { Contact } from '~models';


@Injectable({ providedIn: 'root' })
export class ContactService extends GlobalService<Contact> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new ContactQueries(), 'Contact');
	}

}

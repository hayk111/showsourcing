import { Injectable } from '@angular/core';
import { Contact } from '~models';
import { Observable } from 'rxjs';
import { ApolloClient } from '~shared/apollo';
import { map, take } from 'rxjs/operators';
import { SUPPLIER_CONTACT_QUERY, CREATE_CONTACT, UPDATE_CONTACT } from './contact.queries';
import { uuid } from '~app-root/utils/uuid.utils';

@Injectable()
export class ContactService {

	constructor(private apollo: ApolloClient) { }

	getContacts(supplierId: string): Observable<Contact[]> {
		return this.apollo.subscribe({ query: SUPPLIER_CONTACT_QUERY, variables: { query: `supplier.id == '${supplierId}'` } }).pipe(
			map((r: any) => r.data.contacts)
		);
	}

	createContact(contact: Contact, supplierId: string) {
		contact.id = uuid();
		contact.deleted = false;
		contact.supplier = {
			id: supplierId
		};
		return this.apollo.mutate({ mutation: CREATE_CONTACT, variables: { contact } }).pipe(take(1)).subscribe();
	}

	updateContact(contact: Contact) {
		return this.apollo.mutate({ mutation: UPDATE_CONTACT, variables: { contact } }).pipe(take(1)).subscribe();
	}
}

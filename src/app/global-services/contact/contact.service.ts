import { Injectable } from '@angular/core';
import { GlobalServiceInterface } from '../_interfaces/global.service';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ContactQueries } from './contact.queries';
import { ApolloClient } from '~shared/apollo';
import { Contact } from '~models';


@Injectable({ providedIn: 'root' })
export class ContactService implements GlobalServiceInterface<Contact> {

	private queries = new ContactQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string) {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectMany(page$): Observable<Contact[]> {
		// TODO
		// return this.apollo.selectMany({
		// 	gql: this.queries.list,
		// 	query: `supplier.id == '${supplierId}'`
		// }).pipe(
		// 	map((r: any) => r.data.contacts)
		// );
		throw Error('not implemented yet');
	}

	selectAll(): Observable<Contact[]> {
		return this.apollo.selectMany({ gql: this.queries.all });
	}

	create(contact: Contact): Observable<Contact> {
		return this.apollo.create({
			gql: this.queries.create,
			input: contact,
			typename: 'Contact'
		}).pipe(
			map(({ data }) => data.createContact),
			first()
		);
	}

	update(contact: Contact): Observable<Contact> {
		return this.apollo.update({
			gql: this.queries.update,
			input: contact,
			typename: 'Contact'
		}).pipe(
			first()
		);
	}

	delete(contact: Contact): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(entity: Contact[]): Observable<any> {
		throw Error('Method not implemented');
	}
}
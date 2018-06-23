import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Event } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalServiceInterface } from '../_interfaces/global.service';
import { EventQueries } from './event.queries';


@Injectable({
	providedIn: 'root'
})
export class EventService implements GlobalServiceInterface<Event> {
	queries = new EventQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Event> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<Event[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.events)
		);
	}

	update(status: Event): Observable<Event> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'Event'
		}).pipe(
			first(),
			map(({ data }) => data.updateEvent)
		);
	}

	create(status: Event): Observable<Event> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'Event'
		}).pipe(
			first(),
			map(({ data }) => data.createEvent)
		);
	}

	delete(event: Event): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(event: Event[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { Event } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';

import { EventQueries } from './event.queries';

@Injectable()
export class EventService implements GlobalServiceInterface<Event> {

	queries = new EventQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Event> {
		throw Error('not implemented yet');
	}

	selectAll(fields: string) {
		return this.apollo.subscribe({
			query: this.queries.all(fields)
		}).pipe(map(({ data }) => (<any>data).events));
	}

	update(event: Event): Observable<Event> {
		return this.apollo.update({
			mutation: this.queries.update,
			input: event,
			typename: 'Event'
		}).pipe(map(({ data }) => (<any>data).events));
	}

	create(event: Event): Observable<Event> {
		return this.apollo.create({ mutation: this.queries.create, input: event, typename: 'Event' })
			.pipe(
				map((r: any) => r.data.addEvent.id)
			);
	}

	delete(event: Event) {
		return this.apollo.delete({ mutation: this.queries.delete, input: event.id, typename: 'Event' }).pipe(first());
	}

	deleteMany(events: Event[]) {
		return null;
	}

}


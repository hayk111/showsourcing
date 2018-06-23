import { ApolloClient } from '~shared/apollo';
import { Injectable } from '@angular/core';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';
import { Event } from '~models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class EventService implements GlobalServiceInterface<Event> {
	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Event> {
		throw Error('not implemented yet')
	}

	selectAll(): Observable<Event[]> {
		throw Error('not implemented yet')
	}

	update(category: Event): Observable<Event> {
		throw Error('not implemented yet')
	}
	create(entity: Event): Observable<Event> {
		throw Error('not implemented yet')
	}
	delete(entity: Event): Observable<any> {
		throw Error('not implemented yet')
	}
	deleteMany(entity: Event[]): Observable<any> {
		throw Error('not implemented yet')
	}
}
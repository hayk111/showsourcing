import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Tag } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '../_interfaces/global.service';

import { TagQueries } from './tag.queries';


@Injectable({
	providedIn: 'root'
})
export class TagService implements GlobalServiceInterface<Tag> {
	queries = new TagQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Tag> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<Tag[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.tags)
		);
	}

	update(status: Tag): Observable<Tag> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'Tag'
		}).pipe(
			first(),
			map(({ data }) => data.updateTag)
		);
	}

	create(status: Tag): Observable<Tag> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'Tag'
		}).pipe(
			first(),
			map(({ data }) => data.createTag)
		);
	}

	delete(tag: Tag): Observable<any> {
		throw Error('not implemented yet');
	}

	deleteMany(tag: Tag[]): Observable<any> {
		throw Error('not implemented yet');
	}
}

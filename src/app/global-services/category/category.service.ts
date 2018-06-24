import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalServiceInterface } from '../_interfaces/global.service';
import { CategoryQueries } from './category.queries';


@Injectable({
	providedIn: 'root'
})
export class CategoryService implements GlobalServiceInterface<Category> {
	queries = new CategoryQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Category> {
		return this.apollo.selectOne({ gql: this.queries.one, id });
	}

	selectAll(fields: string = 'id, name'): Observable<Category[]> {
		return this.apollo.selectMany({ gql: this.queries.all(fields) }).pipe(
			map(({ data }) => data.categories)
		);
	}

	update(status: Category): Observable<Category> {
		return this.apollo.update({
			gql: this.queries.update,
			input: status,
			typename: 'Category'
		}).pipe(
			first(),
			map(({ data }) => data.updateCategory)
		);
	}

	create(status: Category): Observable<Category> {
		return this.apollo.create({
			gql: this.queries.create,
			input: status,
			typename: 'Category'
		}).pipe(
			first(),
			map(({ data }) => data.createCategory)
		);
	}

	delete(ids: string | string[]): Observable<any> {
		if (Array.isArray(ids))
			return this.apollo.delete(ids)
	}

}

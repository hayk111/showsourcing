import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalServiceInterface } from '~shared/global-services/_interfaces/global.service';

import { CategoryQueries } from './category.queries';

@Injectable()
export class CategoryService implements GlobalServiceInterface<Category> {

	queries = new CategoryQueries();

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Category> {
		throw Error('not implemented yet');
	}

	selectAll(fields: string) {
		return this.apollo.subscribe({
			query: this.queries.all(fields)
		}).pipe(map(({ data }) => (<any>data).categories));
	}

	update(category: Category): Observable<Category> {
		return this.apollo.update({
			mutation: this.queries.update,
			input: category,
			typename: 'Category'
		}).pipe(map(({ data }) => (<any>data).categories));
	}

	create(category: Category): Observable<Category> {
		return this.apollo.create({ mutation: this.queries.create, input: category, typename: 'Category' })
			.pipe(
				map((r: any) => r.data.addCategory.id)
			);
	}

	delete(category: Category) {
		return this.apollo.delete({ mutation: this.queries.delete, input: category.id, typename: 'Category' }).pipe(take(1));
	}

	deleteMany(categories: Category[]) {
		return null;
	}
}


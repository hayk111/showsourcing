import { Observable } from 'rxjs';
import { Category } from '~models';
import { Injectable } from '@angular/core';
import { CategoryQueries } from '~features/data-management/services/category.queries';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';

@Injectable()
export class CategoryService {

	constructor(private apollo: ApolloClient) { }

	selectOne(id: string): Observable<Category> {
		throw Error('not implemented yet');
	}

	// selectList(): Observable<Category[]> {
	// 	throw Error('not implemented yet');
	// }

	// selectAll() {

	// }
	update(category: Category) {
		return this.apollo.update({
			mutation: CategoryQueries.updateCategory,
			input: category,
			typename: 'Category'
		});
	}

	create(category: Category) {
		throw Error('not implemented yet');
	}

	delete(category: Category) {
		throw Error('not implemented yet');
	}

}


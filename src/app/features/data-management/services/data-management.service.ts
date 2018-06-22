import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable, from } from 'rxjs';
import { filter, first, map, take } from 'rxjs/operators';
import { CategoryQueries } from '~features/data-management/services/category.queries';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';

@Injectable()
export class DataManagementService {
	private categoriesQuery$: QueryRef<string, any>;

	constructor(private apollo: ApolloClient) { }

	selectItems(type: string): Observable<Category[]> {
		return null;
	}
}

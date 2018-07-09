import { Injectable } from '@angular/core';
import { Category } from '~models';
import { GqlClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { CategoryQueries } from './category.queries';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new CategoryQueries, 'Category');
	}

}

import { Injectable } from '@angular/core';
import { Category } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '../_global/global.service';
import { CategoryQueries } from './category.queries';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new CategoryQueries, 'Category');
	}

}

import { Injectable } from '@angular/core';
import { Category } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { CategoryQueries } from '~global-services/category/category.queries';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new CategoryQueries, 'Category');
	}

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalServiceInterface, GlobalService } from '../_global/global.service';
import { CategoryQueries } from './category.queries';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new CategoryQueries, 'Category');
	}

}

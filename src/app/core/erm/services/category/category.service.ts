import { Injectable } from '@angular/core';
import { Category } from '~core/erm/models';
import { CategoryQueries } from '~core/erm/services/category/category.queries';
import { GlobalService } from '../../../erm2/global.service-2';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalService<Category> {

	constructor() {
		super(CategoryQueries, 'category');
	}

}

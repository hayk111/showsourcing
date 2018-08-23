import { Injectable } from '@angular/core';
import { Category } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { CategoryQueries } from '~global-services/category/category.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(apollo: Apollo, protected userSrv: UserService) {
		super(apollo, CategoryQueries, 'category', 'categories', userSrv);
	}

}

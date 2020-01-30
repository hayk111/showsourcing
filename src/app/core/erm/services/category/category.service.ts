import { Injectable } from '@angular/core';
import { Category } from '~core/erm/models';
import { CategoryQueries } from '~core/erm/services/category/category.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(protected userSrv: UserService) {
		super(CategoryQueries, 'category', 'categories', userSrv);
	}

}

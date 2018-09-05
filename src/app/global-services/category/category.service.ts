import { Injectable } from '@angular/core';
import { Category } from '~models';

import { GlobalService } from '~global-services/_global/global.service';
import { CategoryQueries } from '~global-services/category/category.queries';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { UserService } from '~global-services/user/user.service';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, CategoryQueries, 'category', 'categories', userSrv);
	}

}

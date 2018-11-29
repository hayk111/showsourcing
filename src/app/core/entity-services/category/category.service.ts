import { Injectable } from '@angular/core';
import { Category } from '~models';

import { GlobalService } from '~entity-services/_global/global.service';
import { CategoryQueries } from '~entity-services/category/category.queries';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { UserService } from '~entity-services/user/user.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, CategoryQueries, 'category', 'categories', userSrv);
	}

}

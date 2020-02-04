import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/erm/services/_global/global-with-audit.service';
import { CategoryQueries } from '~core/erm/services/category/category.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { Category } from '~core/erm/models';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, CategoryQueries, 'category', 'categories', userSrv);
	}

}

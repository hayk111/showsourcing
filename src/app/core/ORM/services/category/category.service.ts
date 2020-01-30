import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { CategoryQueries } from '~entity-services/category/category.queries';
import { UserService } from '~entity-services/user/user.service';
import { Category } from '~models';


@Injectable({
	providedIn: 'root'
})
export class CategoryService extends GlobalWithAuditService<Category> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, CategoryQueries, 'category', 'categories', userSrv);
	}

}

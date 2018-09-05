import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusTypeQueries } from '~global-services/product-status-type/product-status-type.queries';
import { ProductStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusTypeService extends GlobalService<ProductStatusType> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, ProductStatusTypeQueries, 'productStatusType', 'productStatusTypes');
	}

}


import { Injectable } from '@angular/core';
import { GlobalService } from '~entity-services/_global/global.service';
import { ProductStatusTypeQueries } from '~entity-services/product-status-type/product-status-type.queries';
import { ProductStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusTypeService extends GlobalService<ProductStatusType> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ProductStatusTypeQueries, 'productStatusType', 'productStatusTypes');
	}

}


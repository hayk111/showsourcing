import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { ProductStatusQueries } from '~core/ORM/services/product-status/product-status.queries';
import { ProductStatus } from '~core/ORM/models';

import { GlobalService } from '../_global/global.service';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalService<ProductStatus> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, ProductStatusQueries, 'productStatus', 'productStatuses');
	}
}

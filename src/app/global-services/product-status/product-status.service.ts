import { Injectable } from '@angular/core';
import { ProductStatus } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusQueries } from '~global-services/product-status/product-status.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalService<ProductStatus> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProductStatusQueries(), 'ProductStatus');
	}
}

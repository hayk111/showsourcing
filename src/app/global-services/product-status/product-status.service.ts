import { Injectable } from '@angular/core';
import { ProductStatus } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '../_global/global.service';
import { ProductStatusQueries } from './product-status.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalService<ProductStatus> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProductStatusQueries(), 'ProductStatus');
	}

}


import { Injectable } from '@angular/core';
import { ProductStatus } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProductStatusQueries } from './product-status.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalService<ProductStatus> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ProductStatusQueries(), 'ProductStatus');
	}

}


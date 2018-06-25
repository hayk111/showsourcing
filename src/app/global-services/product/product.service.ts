import { Injectable } from '@angular/core';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProductQueries } from './product.queries';
import { share } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalService<Product> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ProductQueries(), 'Product');
	}
}


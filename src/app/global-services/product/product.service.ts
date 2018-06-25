import { Injectable } from '@angular/core';
import { Product } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProductQueries } from './product.queries';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalService<Product> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new ProductQueries(), 'Product');
	}

	selectOne(id: string) {
		return super.selectOne(id);
	}
}


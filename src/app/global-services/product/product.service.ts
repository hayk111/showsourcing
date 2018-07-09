import { Injectable } from '@angular/core';
import { Product } from '~models';
import { GqlClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { ProductQueries } from './product.queries';
import { share } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalService<Product> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new ProductQueries(), 'Product');
	}
}


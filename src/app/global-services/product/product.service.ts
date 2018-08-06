import { Injectable } from '@angular/core';
import { Product } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { ProductQueries } from '~global-services/product/product.queries';
import { share, map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalService<Product> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProductQueries(), 'Product');
	}


}


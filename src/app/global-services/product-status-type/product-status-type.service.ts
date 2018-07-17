import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusTypeQueries } from '~global-services/product-status-type/product-status-type.queries';
import { ProductStatusType } from '~models';
import { ApolloWrapper } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusTypeService extends GlobalService<ProductStatusType> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new ProductStatusTypeQueries(), 'ProductStatusType');
	}

}


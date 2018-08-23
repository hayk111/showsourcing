import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ProductStatusTypeQueries } from '~global-services/product-status-type/product-status-type.queries';
import { ProductStatusType } from '~models';
import { Apollo } from 'apollo-angular';


@Injectable({
	providedIn: 'root'
})
export class ProductStatusTypeService extends GlobalService<ProductStatusType> {

	constructor(protected apollo: Apollo) {
		super(apollo, new ProductStatusTypeQueries(), 'ProductStatusType');
	}

}


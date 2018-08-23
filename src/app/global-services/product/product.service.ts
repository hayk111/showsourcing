import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { ProductQueries } from '~global-services/product/product.queries';
import { UserService } from '~global-services/user/user.service';
import { Product } from '~models';
import { Apollo } from 'apollo-angular';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';


@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {

	constructor(apollo: Apollo protected userSrv: UserService) {
		super(wrapper, new ProductQueries(), 'Product', userSrv);
	}

}


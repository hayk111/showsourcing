import { Injectable } from '@angular/core';
import { ProductStatus } from '~core/erm/models';
import { ProductStatusQueries } from '~core/erm/services/product-status/product-status.queries';
import { GlobalService } from '../_global/global.service';



@Injectable({
	providedIn: 'root'
})
export class ProductStatusService extends GlobalService<ProductStatus> {

	constructor() {
		super( ProductStatusQueries, 'productStatus', 'productStatuses');
	}
}

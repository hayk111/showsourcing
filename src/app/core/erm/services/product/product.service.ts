import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { Product } from '~core/erm/models';
import { ProductQueries } from '~core/erm/services/product/product.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalService } from '../../../erm2/global.service-2';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalService<Product> {

	constructor(
		protected analytics: AnalyticsService,
		protected userSrv: UserService) {
		super(ProductQueries, 'product', undefined, analytics);
	}

	private _selectedProds$ = new Subject<Product[]>();
	selectedProds$ = this._selectedProds$.asObservable();

	private _productListUpdate$ = new Subject<void>();
	productListUpdate$ = this._productListUpdate$.asObservable();

	addProducts(products: Product[]) {
		this._selectedProds$.next(products);
	}

	onUpdateProductList() {
		this._productListUpdate$.next();
	}
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnalyticsService } from '~core/analytics/analytics.service';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { ProductQueries } from '~core/ORM/services/product/product.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { Product } from '~core/ORM/models';

@Injectable({
	providedIn: 'root'
})
export class ProductService extends GlobalWithAuditService<Product> {

	constructor(
		protected analytics: AnalyticsService,
		protected apolloState: ApolloStateService,
		protected userSrv: UserService) {
		super(apolloState, ProductQueries, 'product', 'products', userSrv, analytics);
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

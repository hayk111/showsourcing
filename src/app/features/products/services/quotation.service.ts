import { Injectable } from '@angular/core';
import {
	QuoteService,
	SupplierService,
	UserService,
	QuoteQueries
} from '~global-services';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { ApolloStateService } from '~core/apollo';
import { Product, Quote } from '~models';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Injectable()
export class QuoteFeatureService extends QuoteService {
	constructor(
		protected apolloState: ApolloStateService,
		private quoteService: QuoteService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	getQuotationFromProduct(productId: string): Observable<Quote[]> {
		return this.queryMany(
			{ query: `product.id == "${productId}"` }
		).pipe(first());
	}
}

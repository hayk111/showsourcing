import { Injectable } from '@angular/core';
import { QuoteService, SupplierService, UserService } from '~global-services';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { ApolloStateService } from '~shared/apollo';
import { Product, Quote } from '~models';
import { Observable } from 'apollo-link';

@Injectable()
export class QuoteFeatureService extends QuoteService {

	constructor(
		protected apolloState: ApolloStateService,
		private quoteService: QuoteService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
  }

  getQuotationFromProducts(products: any): Observable<Quote[]> {
    return null;
  }
}

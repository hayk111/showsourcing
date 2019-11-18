import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ApolloStateService } from '~core/apollo';
import { QuoteService, UserService } from '~entity-services';
import { Quote } from '~models';

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

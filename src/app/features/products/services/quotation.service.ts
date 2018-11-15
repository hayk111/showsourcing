import { Injectable } from '@angular/core';
import {
  QuoteService,
  SupplierService,
  UserService,
  QuoteQueries
} from '~global-services';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { ApolloStateService } from '~shared/apollo';
import { Product, Quote } from '~models';
import { Observable } from 'apollo-link';
import { first } from 'rxjs/operators';

@Injectable()
export class QuoteFeatureService extends QuoteService {
  constructor(
    protected apolloState: ApolloStateService,
    private quoteService: QuoteService,
    protected userSrv: UserService
  ) {
    super(apolloState, userSrv);
  }

  getQuotationFromProducts(productIds: any): Observable<Quote[]> {
    return this.queryMany(
      { query: `${productIds} CONTAINS product.id` },
      QuoteQueries.many
    ).pipe(first());
  }
}

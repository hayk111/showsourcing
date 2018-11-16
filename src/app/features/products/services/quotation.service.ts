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
      { query: `product.id == "a4f3099c-a565-4bd1-8699-986d1eab9e31"` },
      QuoteQueries.many
    ).pipe(first());
  }
}

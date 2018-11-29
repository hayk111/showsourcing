import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { QuoteQueries } from '~global-services/quote/quote.queries';
import { UserService } from '~global-services/user/user.service';
import { Quote } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~global-services/_global/global.service';

@Injectable({ providedIn: 'root' })
export class QuoteService extends GlobalService<Quote> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, QuoteQueries, 'quote', 'quotes');
	}
}

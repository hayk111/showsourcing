import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { QuoteQueries } from '~entity-services/quote/quote.queries';
import { UserService } from '~entity-services/user/user.service';
import { Quote } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~entity-services/_global/global.service';

@Injectable({ providedIn: 'root' })
export class QuoteService extends GlobalService<Quote> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, QuoteQueries, 'quote', 'quotes');
	}
}

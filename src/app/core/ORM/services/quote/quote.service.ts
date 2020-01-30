import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~core/ORM/services/_global/global-with-audit.service';
import { QuoteQueries } from '~core/ORM/services/quote/quote.queries';
import { UserService } from '~core/ORM/services/user/user.service';
import { Quote } from '~core/ORM/models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { GlobalService } from '~core/ORM/services/_global/global.service';

@Injectable({ providedIn: 'root' })
export class QuoteService extends GlobalService<Quote> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, QuoteQueries, 'quote', 'quotes');
	}
}

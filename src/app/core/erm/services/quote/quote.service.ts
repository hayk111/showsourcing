import { Injectable } from '@angular/core';
import { Quote } from '~core/erm/models';
import { QuoteQueries } from '~core/erm/services/quote/quote.queries';
import { UserService } from '~core/erm/services/user/user.service';
import { GlobalService } from '~core/erm/services/_global/global.service';

@Injectable({ providedIn: 'root' })
export class QuoteService extends GlobalService<Quote> {

	constructor(protected userSrv: UserService) {
		super(QuoteQueries, 'quote', 'quotes');
	}
}

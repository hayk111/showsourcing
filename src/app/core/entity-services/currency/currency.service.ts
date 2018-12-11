import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { Currency } from '~core/models';

import { GlobalService } from '../_global/global.service';
import { CurrencyQueries } from './currency.queries';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService extends GlobalService<Currency> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, CurrencyQueries, 'currency', 'currencies');
	}

}

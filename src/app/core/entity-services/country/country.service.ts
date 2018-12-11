import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { Country } from '~core/models';

import { GlobalService } from '../_global/global.service';
import { CountryQueries } from './country.queries';

@Injectable({
	providedIn: 'root'
})
export class CountryService extends GlobalService<Country> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, CountryQueries, 'country', 'countries');
	}

}

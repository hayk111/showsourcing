import { Injectable } from '@angular/core';
import { Country } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';
import { CountryQueries } from './country.queries';

@Injectable({
	providedIn: 'root'
})
export class CountryService extends GlobalService<Country> {

	constructor() {
		super(CountryQueries, 'country', 'countries');
	}

}

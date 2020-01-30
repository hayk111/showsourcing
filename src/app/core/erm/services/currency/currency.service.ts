import { Injectable } from '@angular/core';
import { Currency } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';
import { CurrencyQueries } from './currency.queries';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService extends GlobalService<Currency> {


	constructor() {
		super(CurrencyQueries, 'currency', 'currencies');
	}

}

import { Injectable } from '@angular/core';
import { countries, incoTerms, harbours, currencies } from '~utils/constants';
import { of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { SelectorQueries } from './selector.queries';
import { map, tap } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(private apollo: Apollo) { }

	getCountries() {
		return countries;
	}

	getIncoTerms() {
		return incoTerms;
	}

	getHarbours() {
		return harbours;
	}

	getCurrencies() {
		return currencies;
	}

	getSuppliers() {
		return this.apollo.subscribe({ query: SelectorQueries.suppliers }).pipe(
			map(r => r.data.suppliers)
		);
	}

	getCategories() {
		return this.apollo.subscribe({ query: SelectorQueries.categories }).pipe(
			map(r => r.data.categories)
		);
	}

	getEvents() {
		return this.apollo.subscribe({ query: SelectorQueries.events }).pipe(
			map(r => r.data.events)
		);
	}

	getTags() {
		return this.apollo.subscribe({ query: SelectorQueries.tags }).pipe(
			map(r => r.data.tags)
		);
	}
}

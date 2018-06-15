import { Injectable } from '@angular/core';
import { countries, incoTerms, harbours, currencies } from '~utils/constants';
import { of, Observable } from 'rxjs';
import { ApolloClient } from '~shared/apollo';
import { SelectorQueries } from './selector.queries';
import { map, tap, take } from 'rxjs/operators';
import { Supplier } from '~models/supplier.model';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { Category, Event, Tag, SupplierType } from '~models';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(private apollo: ApolloClient) { }

	getCountries(): Array<any> {
		return countries;
	}

	getIncoTerms(): Array<any> {
		return incoTerms;
	}

	getHarbours(): Array<any> {
		return harbours;
	}

	getCurrencies(): Array<any> {
		return currencies;
	}

	getSuppliers(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.suppliers }).pipe(
			map(r => r.data.suppliers)
		);
	}

	getCategories(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.categories }).pipe(
			map(r => r.data.categories)
		);
	}

	getEvents(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.events }).pipe(
			map(r => r.data.events)
		);
	}

	getTags(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.tags }).pipe(
			map(r => r.data.tags)
		);
	}

	getSupplierTypes(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.supplierTypes }).pipe(
			map(r => r.data.supplierTypes)
		);
	}

	createSupplier(supplier: Supplier): Observable<any> {
		return this.apollo.create({ mutation: SelectorQueries.createSupplier, input: supplier, typename: 'Supplier' });
	}

	createCategory(category: Category): Observable<any> {
		return this.apollo.create({ mutation: SelectorQueries.createCategory, input: category, typename: 'Category' });
	}

	createEvent(event: Event): Observable<any> {
		return this.apollo.create({ mutation: SelectorQueries.createEvent, input: event, typename: 'Event' });
	}

	createTag(tag: Tag): Observable<any> {
		return this.apollo.create({ mutation: SelectorQueries.createTag, input: tag, typename: 'Tag' });
	}

	createSupplierType(supplierType: SupplierType): Observable<any> {
		return this.apollo.create({
			mutation: SelectorQueries.createSupplierType,
			input: supplierType,
			typename: 'SupplierType'
		});
	}
}
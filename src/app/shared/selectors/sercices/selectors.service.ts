import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Event, SupplierType, Tag } from '~models';
import { Supplier } from '~models/supplier.model';
import { ApolloClient } from '~shared/apollo';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';

import { SelectorQueries } from './selector.queries';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(private apollo: ApolloClient) { }

	getCountries(): any[] {
		return countries;
	}

	getIncoTerms(): any[] {
		return incoTerms;
	}

	getHarbours(): any[] {
		return harbours;
	}

	getCurrencies(): any[] {
		return currencies;
	}

	getLengthUnits(): any[] {
		return lengthUnits;
	}

	getWeigthUnits(): any[] {
		return weightUnits;
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

	getUsers(): Observable<Choice[]> {
		return this.apollo.subscribe({ query: SelectorQueries.users }).pipe(
			map(r => r.data.users)
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

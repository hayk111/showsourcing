import { Injectable } from '@angular/core';
import { countries, incoTerms, harbours, currencies } from '~utils/constants';
import { of, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { SelectorQueries } from './selector.queries';
import { map, tap, take } from 'rxjs/operators';
import { Supplier } from '~models/supplier.model';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { Category, Event, Tag, SupplierType } from '~models';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(private apollo: Apollo) { }

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
		return this.apollo.mutate({ mutation: SelectorQueries.createSupplier, variables: { supplier } }).pipe(
			take(1)
		);
	}

	createCategory(category: Category): Observable<any> {
		return this.apollo.mutate({ mutation: SelectorQueries.createCategory, variables: { category } }).pipe(
			take(1)
		);
	}

	createEvent(event: Event): Observable<any> {
		return this.apollo.mutate({ mutation: SelectorQueries.createEvent, variables: { event } }).pipe(
			take(1)
		);
	}

	createTag(tag: Tag): Observable<any> {
		return this.apollo.mutate({ mutation: SelectorQueries.createTag, variables: { tag } }).pipe(
			take(1)
		);
	}

	createSupplierType(supplierType: SupplierType): Observable<any> {
		return this.apollo.mutate({ mutation: SelectorQueries.createSupplierType, variables: { supplierType } }).pipe(
			take(1)
		);
	}
}

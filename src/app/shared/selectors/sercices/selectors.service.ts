import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Event, SupplierType, Tag } from '~models';
import { Supplier } from '~models/supplier.model';
import { ApolloClient } from '~shared/apollo';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';

import { SelectorQueries } from './selector.queries';
import { SupplierService, CategoryService, EventService, TagService } from '~shared/global-services';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(
		private supplierSrv: SupplierService,
		private categorySrv: CategoryService,
		private eventSrv: EventService,
		private tagSrv: TagService
	) { }

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

	getSuppliers(): Observable<Supplier[]> {
		return this.supplierSrv.selectAll();
	}

	getCategories(): Observable<Category[]> {
		return this.categorySrv.selectAll();
	}

	getEvents(): Observable<Event[]> {
		return this.eventSrv.selectAll();
	}

	getTags(): Observable<Tag[]> {
		return this.tagSrv.selectAll();
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
		return this.supplierSrv.create(supplier);
	}

	createCategory(category: Category): Observable<any> {
		return this.categorySrv.create(category);
	}

	createEvent(event: Event): Observable<any> {
		return this.eventSrv.create(event);
	}

	createTag(tag: Tag): Observable<any> {
		return this.tagSrv.create(tag);
	}

	createSupplierType(supplierType: SupplierType): Observable<any> {
		return this.supplierTypeSrv.create(supplierType);
	}
}

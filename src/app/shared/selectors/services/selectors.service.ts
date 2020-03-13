import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SelectParamsConfig } from '~core/erm';
import { CurrencyService } from '~core/erm';
import {
	Category,
	Contact,
	Country,
	Currency,
	EntityMetadata,
	ERM,
	Event,
	Harbour,
	IncoTerm,
	LengthUnit,
	Product,
	Project,
	RequestTemplate,
	SupplierType,
	Tag,
	TeamUser,
	User,
	WeightUnit,
} from '~core/erm';
import { Supplier } from '~core/erm';
import { ApiService } from '~core/erm3/services/api.service';
import { ObservableQuery } from '~core/erm3';
import { DynamicField } from '~shared/dynamic-forms';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { ID } from '~utils';
import { countries, currencies, harbours, incoTerms } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	bindLabel = 'name';
	queryListRef: ObservableQuery<any>;
	items$: Observable<any[]>;
	topCurrencies$: Observable<Currency[]>;

	selectParams: SelectParamsConfig = {
		descending: false,
		take: 30,
		skip: 0
	};

	// we use this to trigger the search when we use a map instead of the global data
	search$: BehaviorSubject<string> = new BehaviorSubject('');
	filterList = new FilterList([]);

	currentSearchQuery = '';

	constructor(
		private apiSrv: ApiService,
		private currencySrv: CurrencyService, // the service should be removed in the future when search query will work
	) { }

	setItems() {
		this.items$ = this.queryListRef.data$.pipe(
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => (items || []).filter(itm => !itm.deleted)),
		);
	}

	setFilters(filters: FilterList) {
		if (filters) {
			this.filterList = filters;
			this.selectParams = { ...this.selectParams, query: this.filterList.asPredicate() };
		}
	}

	refetch(selectParams?: SelectParamsConfig) {
		if (this.queryListRef)
			return this.queryListRef.refetch(selectParams || this.selectParams);
	}

	loadMore() {
		// return this.queryListRef.fetchMore().subscribe();
	}

	search(type: EntityMetadata, searchTxt: string) {
		searchTxt = searchTxt.toLowerCase();
		if (searchTxt) {
			switch (type) {
				case ERM.USER:
					this.currentSearchQuery = `firstName CONTAINS[c] "${searchTxt}" OR lastName CONTAINS[c] "${searchTxt}"`;
					break;
				// Constants
				case ERM.CURRENCY:
					// this.currencySrv.queryMany({ query: `symbol == "EUR" OR symbol == "USD" OR symbol == "CNY"` });
					this.topCurrencies$ = this.currencySrv.queryMany({
						query: `((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND symbol CONTAINS[c] "${searchTxt}")` +
							` OR ((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND name CONTAINS[c] "${searchTxt}")`
					});
					this.currentSearchQuery = `symbol CONTAINS[c] "${searchTxt}" OR name CONTAINS[c] "${searchTxt}"`;
					break;
				case ERM.COUNTRY:
					this.currentSearchQuery = `fullName CONTAINS[c] "${searchTxt}" OR countryCode CONTAINS[c] "${searchTxt}"`;
					break;
				case ERM.EVENT:
					this.currentSearchQuery = `name CONTAINS[c] "${searchTxt}" OR description.name CONTAINS[c] "${searchTxt}"`;
					break;
				case ERM.EMAIL:
				case ERM.CONTACT:
					this.currentSearchQuery = `name CONTAINS[c] "${searchTxt}" OR email CONTAINS[c] "${searchTxt}"`;
					break;
				case ERM.CATEGORY:
				case ERM.HARBOUR:
				case ERM.INCO_TERM:
				case ERM.LENGTH_UNIT:
				case ERM.PRODUCT:
				case ERM.PROJECT:
				case ERM.REQUEST_TEMPLATE:
				case ERM.SUPPLIER:
				case ERM.SUPPLIER_TYPE:
				case ERM.TAG:
				case ERM.WEIGHT_UNIT:
					this.currentSearchQuery = `name CONTAINS[c] "${searchTxt}"`;
					break;
				case ERM.PICKER_FIELD:
					this.search$.next(searchTxt);
					break;
				case ERM.SELECTOR_ELEMENT:
					this.currentSearchQuery = `value CONTAINS[c] "${searchTxt}"`;
					break;
				default: throw Error(`Unsupported type for search ${type}`);
			}
		} else {
			this.currentSearchQuery = '';
			this.search$.next('');
		}
		// so we can keep the current search and the filter
		if (this.currentSearchQuery && this.selectParams.query)
			this.currentSearchQuery = '(' + this.currentSearchQuery + ') AND ' + this.selectParams.query;
		else if (this.selectParams.query)
			this.currentSearchQuery = this.selectParams.query;
		return this.refetch({ ...this.selectParams, query: this.currentSearchQuery });
	}

	getCountries(): any[] {
		return countries;
	}

	getCountriesGlobal(): Observable<Country[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'fullName' };
		this.queryListRef = this.apiSrv.listBy('Country');
		this.setItems();
		return this.items$;
	}

	getIncoTerms(): any[] {
		return incoTerms;
	}

	getIncoTermsGlobal(): Observable<IncoTerm[]> {
		// we have to specify that the sort is empty, since when calling another selector can have a different sort
		this.selectParams = { ...this.selectParams, sortBy: '' };
		this.queryListRef = this.apiSrv.listBy('IncoTerm');
		this.setItems();
		return this.items$;
	}

	getHarbours(): any[] {
		return harbours;
	}

	getHarboursGlobal(): Observable<Harbour[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Harbour');
		this.setItems();
		return this.items$;
	}

	getCurrencies(): any[] {
		return currencies;
	}

	getCurrenciesGlobal(): Observable<Currency[]> {
		this.selectParams = { ...this.selectParams, sortBy: '' };
		this.queryListRef = this.apiSrv.listBy('Currency');
		this.setItems();
		this.getTopCurrencies();
		return this.items$;
	}

	private getTopCurrencies() {
		this.topCurrencies$ = this.currencySrv.queryMany(
			{ ...this.selectParams, sortBy: '', query: 'symbol == "EUR" OR symbol == "USD" OR symbol == "CNY"' }
		);
	}


	getLengthUnits(): Observable<LengthUnit[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Length');
		this.setItems();
		return this.items$;
	}

	getWeigthUnits(): Observable<WeightUnit[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Weight');
		this.setItems();
		return this.items$;
	}

	getBusinessTypes(searchTxt?: string): any[] {
		if (searchTxt) {
			return businessTypes.filter(c => {
				const searched = (c[this.bindLabel] as string).toLowerCase();
				const searchString = searchTxt.toLowerCase();
				return searched.includes(searchString);
			});
		}
		return businessTypes;
	}

	getCategoriesBoarding(searchTxt?: string): any[] {
		if (searchTxt) {
			return categories.filter(c => {
				const searched = (c[this.bindLabel] as string).toLowerCase();
				const searchString = searchTxt.toLowerCase();
				return searched.includes(searchString);
			});
		}
		return categories;
	}

	getSuppliers(): Observable<Supplier[]> {
		this.selectParams = {
			descending: false,
			take: 30,
			skip: 0,
			sortBy: 'name'
		};
		this.queryListRef = this.apiSrv.listBy('Supplier');
		this.setItems();
		return this.items$;
	}

	getProducts(): Observable<Product[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Product');
		this.setItems();
		return this.items$;
	}

	getEvents(): Observable<Event[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'description.name' };
		this.queryListRef = this.apiSrv.listBy('Event');
		this.setItems();
		return this.items$;
	}

	getProjects(): Observable<Project[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Project');
		this.setItems();
		return this.items$;
	}

	getCategories(): Observable<Category[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Category');
		this.setItems();
		return this.items$;
	}

	getContacts(): Observable<Contact[]> {
		const query = this.selectParams.query ?
			this.selectParams.query + ' AND email contains "@"' :
			'email contains "@"';
		this.selectParams = { ...this.selectParams, sortBy: 'name', query };
		this.queryListRef = this.apiSrv.listBy('Contact');
		this.setItems();
		return this.items$;
	}

	getRequestTemplates(): Observable<RequestTemplate[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Request');
		this.setItems();
		return this.items$;
	}

	getTags(): Observable<Tag[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('Tag');
		this.setItems();
		return this.items$;
	}

	getSupplierTypes(): Observable<SupplierType[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.queryListRef = this.apiSrv.listBy('SupplierType');
		this.setItems();
		return this.items$;
	}

	getUsers(): Observable<User[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'lastName' };
		this.queryListRef = this.apiSrv.listBy('User');
		this.setItems();
		return this.items$;
	}

	getTeamUsers(): Observable<TeamUser[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'user.lastName' };
		this.queryListRef = this.apiSrv.listBy('TeamUser');
		this.setItems();
		return this.items$;
	}

	getDynamicFields(fields: DynamicField[]): Observable<DynamicField[]> {
		this.items$ = this.search$.pipe(
			map(item => fields.filter(field => {
				const isMatch = field.label ?
					field.label.toLocaleLowerCase().includes(item) : field.name.toLocaleLowerCase().includes(item);
				return isMatch;
			}))
		);
		return this.items$;
	}

	getSelectorElements(definitionReference: ID) {
		this.selectParams = { ...this.selectParams, sortBy: 'value', query: `fieldDefinition.id == "${definitionReference}"` };
		this.queryListRef = this.apiSrv.listBy('Selector element');
		this.setItems();
		return this.items$;
	}

	createSupplier(supplier: Supplier): Observable<any> {
		return this.apiSrv.create<any>('Supplier', supplier);
	}

	createProject(project: Project): Observable<any> {
		return this.apiSrv.create<any>('Project', project);
	}

	createProduct(product: Product): Observable<any> {
		return this.apiSrv.create<any>('Product', product);
	}

	createCategory(category: Category): Observable<any> {
		return this.apiSrv.create<any>('Category', category);
	}

	createContact(contact: Contact): Observable<any> {
		return this.apiSrv.create<any>('Contact', contact);
	}

	createEvent(event: Event): Observable<any> {
		return this.apiSrv.create<any>('Event', event);
	}

	createTag(tag: Tag): Observable<any> {
		return this.apiSrv.create<any>('Tag', tag);
	}

	createSupplierType(supplierType: SupplierType): Observable<any> {
		return this.apiSrv.create<any>('SupplierType', supplierType);
	}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { CountryService } from '~core/entity-services/country/country.service';
import { CurrencyService } from '~core/entity-services/currency/currency.service';
import { HarbourService } from '~core/entity-services/harbour/harbour.service';
import { IncoTermService } from '~core/entity-services/inco-term/inco-term.service';
import {
	CategoryService,
	ContactService,
	EventService,
	LengthUnitService,
	ProductService,
	ProjectService,
	RequestTemplateService,
	SupplierService,
	TagService,
	TeamUserService,
	UserService,
	WeightUnitService,
} from '~entity-services';
import { SupplierTypeService } from '~entity-services/supplier-type/supplier-type.service';
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
} from '~models';
import { Supplier } from '~models/supplier.model';
import { FilterList } from '~shared/filters';
import { translate } from '~utils';
import { countries, currencies, harbours, incoTerms } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';

import { PickerField } from '../components';

@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	bindLabel = 'name';
	listResult: ListQuery<any>;
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
		private categorySrv: CategoryService,
		private contactSrv: ContactService,
		private currencySrv: CurrencyService,
		private eventSrv: EventService,
		private productSrv: ProductService,
		private projectSrv: ProjectService,
		private requestTemplateSrv: RequestTemplateService,
		private supplierSrv: SupplierService,
		private supplierTypeSrv: SupplierTypeService,
		private tagSrv: TagService,
		private userSrv: UserService,
		private harbourSrv: HarbourService,
		private incoTermSrv: IncoTermService,
		private countrySrv: CountryService,
		private teamUserSrv: TeamUserService,
		private weightUnitsrv: WeightUnitService,
		private lengthUnitSrv: LengthUnitService,
	) { }

	setItems() {
		this.items$ = this.listResult.items$.pipe(
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => (items || []).filter(itm => !itm.deleted)),
		);
		this.listResult.items$.connect();
	}

	setFilters(filters: FilterList) {
		if (filters) {
			this.filterList = filters;
			this.selectParams = { ...this.selectParams, query: this.filterList.asPredicate() };
		}
	}

	refetch(selectParams?: SelectParamsConfig) {
		if (this.listResult)
			this.listResult.refetch(selectParams || this.selectParams).pipe(take(1)).subscribe();
	}

	loadMore() {
		return this.listResult.fetchMore().subscribe();
	}

	search(type: EntityMetadata, searchTxt: string) {
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
		this.refetch({ ...this.selectParams, query: this.currentSearchQuery });
	}

	getCountries(): any[] {
		return countries;
	}

	getCountriesGlobal(): Observable<Country[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'fullName' };
		this.listResult = this.countrySrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getIncoTerms(): any[] {
		return incoTerms;
	}

	getIncoTermsGlobal(): Observable<IncoTerm[]> {
		// we have to specify that the sort is empty, since when calling another selector can have a different sort
		this.selectParams = { ...this.selectParams, sortBy: '' };
		this.listResult = this.incoTermSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getHarbours(): any[] {
		return harbours;
	}

	getHarboursGlobal(): Observable<Harbour[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.harbourSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getCurrencies(): any[] {
		return currencies;
	}

	getCurrenciesGlobal(): Observable<Currency[]> {
		this.selectParams = { ...this.selectParams, sortBy: '' };
		this.listResult = this.currencySrv.getListQuery(this.selectParams);
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
		this.listResult = this.lengthUnitSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getWeigthUnits(): Observable<WeightUnit[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.weightUnitsrv.getListQuery(this.selectParams);
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
		this.listResult = this.supplierSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getProducts(): Observable<Product[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.productSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getEvents(): Observable<Event[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'description.name' };
		this.listResult = this.eventSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getProjects(): Observable<Project[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.projectSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getCategories(): Observable<Category[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.categorySrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getContacts(): Observable<Contact[]> {
		const query = this.selectParams.query ?
			this.selectParams.query + ' AND email contains "@"' :
			'email contains "@"';
		this.selectParams = { ...this.selectParams, sortBy: 'name', query };
		this.listResult = this.contactSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getRequestTemplates(): Observable<RequestTemplate[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.requestTemplateSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getTags(): Observable<Tag[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.tagSrv.getListQuery(this.selectParams);
		this.setItems();
		return this.items$;
	}

	getSupplierTypes(): Observable<SupplierType[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
		this.listResult = this.supplierTypeSrv.getListQuery(this.selectParams);
		this.items$ = this.listResult.items$.pipe(
			map(types => types.map(type => {
				return { ...type, name: translate(type.name, 'supplierType') };
			}))
		);
		return this.items$;
	}

	getUsers(): Observable<User[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'lastName' };
		this.listResult = this.userSrv.getListQuery(this.selectParams, '', Client.TEAM);
		this.setItems();
		return this.items$;
	}

	getTeamUsers(): Observable<TeamUser[]> {
		this.selectParams = { ...this.selectParams, sortBy: 'user.lastName' };
		this.listResult = this.teamUserSrv.getListQuery(this.selectParams, '', Client.TEAM);
		this.setItems();
		return this.items$;
	}

	getPickerFields(fields: PickerField[]): Observable<PickerField[]> {
		this.items$ = this.search$.pipe(
			map(item => fields.filter(field => field.name.toLocaleLowerCase().includes(item))),
		);
		return this.items$;
	}

	createSupplier(supplier: Supplier): Observable<any> {
		return this.supplierSrv.create(supplier);
	}

	createProject(project: Project): Observable<any> {
		return this.projectSrv.create(project);
	}

	createProduct(product: Product): Observable<any> {
		return this.productSrv.create(product);
	}

	createCategory(category: Category): Observable<any> {
		return this.categorySrv.create(category);
	}

	createContact(contact: Contact): Observable<any> {
		return this.contactSrv.create(contact);
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
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
	ProductService,
	ProjectService,
	SupplierService,
	TagService,
	UserService,
	RequestTemplateService,
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
	Product,
	Project,
	SupplierType,
	Tag,
	User,
	RequestTemplate,
} from '~models';
import { Supplier } from '~models/supplier.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';
import { FilterList } from '~shared/filters';


@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	bindLabel = 'name';
	listResult: ListQuery<any>;
	items$: Observable<any[]>;
	/** non observable version of the above */
	private items = [];
	topCurrencies$: Observable<Currency[]>;

	selectParams: SelectParamsConfig = {
		descending: false,
		take: 30,
		skip: 0
	};

	filterList = new FilterList([]);

	currentSearchQuery = '';

	constructor(
		private categorySrv: CategoryService,
		private contactSrv: ContactService,
		private constPipe: ConstPipe,
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
		private countrySrv: CountryService
	) { }

	setItems() {
		this.items$ = this.listResult.items$.pipe(
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => items.filter(itm => !itm.deleted)),
			tap(items => this.items = items),
		);
	}

	setFilters(filters: FilterList) {
		if (filters) {
			this.filterList = filters;
			this.selectParams = { ...this.selectParams, query: this.filterList.asPredicate() };
		}
	}

	refetch(selectParams?: SelectParamsConfig) {
		this.listResult.refetch(selectParams || this.selectParams).pipe(first()).subscribe();
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
							` OR ((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND name CONTAINS[c]"${searchTxt}")`
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
				case ERM.INCOTERM:
				case ERM.PRODUCT:
				case ERM.PROJECT:
				case ERM.REQUEST_TEMPLATE:
				case ERM.SUPPLIER:
				case ERM.SUPPLIER_TYPE:
				case ERM.TAG:
					this.currentSearchQuery = `name CONTAINS[c] "${searchTxt}"`;
					break;
				default: throw Error(`Unsupported type for search ${type}`);
			}
		} else this.currentSearchQuery = '';
		this.currentSearchQuery = this.currentSearchQuery ?
			'(' + this.currentSearchQuery + ') AND ' + this.selectParams.query :
			this.selectParams.query;
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
		this.selectParams = { ...this.selectParams, sortBy: '' };
		this.listResult = this.currencySrv.getListQuery({ ...this.selectParams, query: 'symbol == "EUR" OR symbol == "USD" OR symbol == "CNY"' });
		this.topCurrencies$ = this.listResult.items$;
	}


	getLengthUnits(searchTxt?: string): any[] {
		if (searchTxt) {
			return lengthUnits.filter(c => {
				const searched = (c[this.bindLabel] as string).toLowerCase();
				const searchString = searchTxt.toLowerCase();
				return searched.includes(searchString);
			});
		}
		return lengthUnits;
	}

	getWeigthUnits(searchTxt?: string): any[] {
		if (searchTxt) {
			return weightUnits.filter(c => {
				const searched = (c[this.bindLabel] as string).toLowerCase();
				const searchString = searchTxt.toLowerCase();
				return searched.includes(searchString);
			});
		}
		return weightUnits;
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
		this.selectParams = { ...this.selectParams, sortBy: 'name' };
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
				return { ...type, name: this.constPipe.transform(type.name, 'supplierType') };
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

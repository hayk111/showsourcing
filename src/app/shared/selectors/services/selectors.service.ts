import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { CurrencyService } from '~core/entity-services/currency/currency.service';
import {
	CategoryService,
	EventService,
	ProductService,
	ProjectService,
	SupplierService,
	TagService,
	UserService,
} from '~entity-services';
import { SupplierTypeService } from '~entity-services/supplier-type/supplier-type.service';
import { Category, Currency, Event, Product, Project, SupplierType, Tag, User, Country, IncoTerm, Harbour } from '~models';
import { Supplier } from '~models/supplier.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';
import { HarbourService } from '~core/entity-services/harbour/harbour.service';
import { IncoTermService } from '~core/entity-services/inco-term/inco-term.service';
import { CountryService } from '~core/entity-services/country/country.service';
import { SelectParamsConfig, SelectParams } from '~core/entity-services/_global/select-params';
import { ListQuery } from '~core/entity-services/_global/list-query.interface';


@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	bindLabel = 'name';
	listResult: ListQuery<any>;
	item$: Observable<any>;

	selectParams: SelectParamsConfig = {
		descending: false,
		take: 15,
		skip: 0
	};

	constructor(
		private categorySrv: CategoryService,
		private constPipe: ConstPipe,
		private currencySrv: CurrencyService,
		private eventSrv: EventService,
		private productSrv: ProductService,
		private projectSrv: ProjectService,
		private supplierSrv: SupplierService,
		private supplierTypeSrv: SupplierTypeService,
		private tagSrv: TagService,
		private userSrv: UserService,
		private harbourSrv: HarbourService,
		private incoTermSrv: IncoTermService,
		private countrySrv: CountryService
	) { }

	init() {
		console.log(SelectParams);
		this.listResult = this.countrySrv.getListQuery({ ...this.selectParams });
		this.item$ = this.listResult.items$;
	}

	getCountries(): any[] {
		return countries;
	}

	getCountriesGlobal(searchTxt?: string): Observable<Country[]> {
		if (searchTxt) {
			this.selectParams = { ...this.selectParams, query: `fullName CONTAINS[c] "${searchTxt}" OR countryCode CONTAINS[c] "${searchTxt}"` };
		}
		this.init();
		return this.item$;
	}

	getIncoTerms(): any[] {
		return incoTerms;
	}

	getIncoTermsGlobal(searchTxt?: string): Observable<IncoTerm[]> {
		if (searchTxt) return this.incoTermSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		else return this.incoTermSrv.queryAll();
	}

	getHarbours(): any[] {
		return harbours;
	}

	getHarboursGlobal(searchTxt?: string): Observable<Harbour[]> {
		if (searchTxt) return this.harbourSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		else return this.harbourSrv.queryAll();
	}

	getCurrencies(): any[] {
		return currencies;
	}

	getCurrenciesGlobal(searchTxt?: string): Observable<Currency[]> {
		if (searchTxt) return this.currencySrv.queryMany({ query: `symbol CONTAINS[c] "${searchTxt}" OR name CONTAINS[c] "${searchTxt}"` });
		else return this.currencySrv.queryAll();
	}

	getTopCurrencies(searchTxt?: string): Observable<Currency[]> {
		if (searchTxt)
			return this.currencySrv.queryMany({
				query: `((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND symbol CONTAINS[c] "${searchTxt}")` +
					` OR ((symbol == "EUR" OR symbol == "USD" OR symbol == "CNY") AND name CONTAINS[c]"${searchTxt}")`
			});
		return this.currencySrv.queryMany({ query: `symbol == "EUR" OR symbol == "USD" OR symbol == "CNY"` });
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

	getSuppliers(searchTxt?: string): Observable<Supplier[]> {
		if (searchTxt) return this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		return this.supplierSrv.queryAll();
	}

	getProducts(searchTxt?: string): Observable<Product[]> {
		if (searchTxt) return this.productSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		return this.productSrv.queryAll();
	}

	getProjects(searchTxt?: string): Observable<Project[]> {
		if (searchTxt) return this.projectSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		return this.projectSrv.queryAll();
	}

	getCategories(searchTxt?: string): Observable<Category[]> {
		if (searchTxt) return this.categorySrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		return this.categorySrv.queryAll();
	}

	getEvents(): Observable<Event[]> {
		return this.eventSrv.queryAll('id, name');
	}

	getTags(searchTxt?: string): Observable<Tag[]> {
		if (searchTxt) return this.tagSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` });
		return this.tagSrv.queryAll();
	}

	getSupplierTypes(searchTxt?: string): Observable<SupplierType[]> {
		if (searchTxt) return this.supplierTypeSrv.queryMany({ query: `name CONTAINS[c] "${searchTxt}"` }).pipe(
			map(types => types.map(type => {
				return { ...type, name: this.constPipe.transform(type.name, 'supplierType') };
			}))
		);
		return this.supplierTypeSrv.queryAll().pipe(
			map(types => types.map(type => {
				return { ...type, name: this.constPipe.transform(type.name, 'supplierType') };
			}))
		);
	}

	getUsers(searchTxt?: string): Observable<User[]> {
		if (searchTxt) return this.userSrv
			.queryMany({ query: `firstName CONTAINS[c] "${searchTxt}" OR lastName CONTAINS[c] "${searchTxt}"` }, '', Client.TEAM);
		return this.userSrv.queryAll('', null, Client.TEAM);
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

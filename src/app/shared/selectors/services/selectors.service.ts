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
import { Category, Currency, Event, Product, Project, SupplierType, Tag, User } from '~models';
import { Supplier } from '~models/supplier.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';


@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

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
		private userSrv: UserService
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

	getCurrenciesGlobal(searchTxt?: string): Observable<Currency[]> {
		if (searchTxt) return this.currencySrv.queryMany({ query: `symbol CONTAINS[c] "${searchTxt}"` });
		else return this.currencySrv.queryAll();
	}

	getLengthUnits(): any[] {
		return lengthUnits;
	}

	getWeigthUnits(): any[] {
		return weightUnits;
	}

	getBusinessTypes(): any[] {
		return businessTypes;
	}

	getCategoriesBoarding(): any[] {
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

	getSupplierTypes(): Observable<SupplierType[]> {
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

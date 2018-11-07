import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryService, EventService, SupplierService, TagService } from '~global-services';
import { SupplierTypeService } from '~global-services/supplier-type/supplier-type.service';
import { TeamUserService } from '~global-services/team-user/team-user.service';
import { Category, Event, SupplierType, Tag, TeamUser, User } from '~models';
import { Supplier } from '~models/supplier.model';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';
import { businessTypes } from '~utils/constants/business-types.const';
import { categories } from '~utils/constants/categories.const';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';


@Injectable({
	providedIn: 'root',
})
export class SelectorsService {

	constructor(
		private constPipe: ConstPipe,
		private supplierSrv: SupplierService,
		private categorySrv: CategoryService,
		private eventSrv: EventService,
		private tagSrv: TagService,
		private teamUserSrv: TeamUserService,
		private supplierTypeSrv: SupplierTypeService,
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

	getBusinessTypes(): any[] {
		return businessTypes;
	}

	getCategoriesBoarding(): any[] {
		return categories;
	}

	getSuppliers(): Observable<Supplier[]> {
		return this.supplierSrv.queryAll();
	}

	getCategories(): Observable<Category[]> {
		return this.categorySrv.queryAll();
	}

	getEvents(): Observable<Event[]> {
		return this.eventSrv.queryAll('id, name');
	}

	getTags(): Observable<Tag[]> {
		return this.tagSrv.queryAll();
	}

	getSupplierTypes(): Observable<SupplierType[]> {
		return this.supplierTypeSrv.queryAll().pipe(
			map(types => types.map(type => {
				return { ...type, name: this.constPipe.transform(type.name, 'supplierType') };
			}))
		);
	}

	getUsers(): Observable<User[]> {
		return this.teamUserSrv.queryAll().pipe(
			map((teamUsers: TeamUser[]) => teamUsers.map(tu => tu.user))
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

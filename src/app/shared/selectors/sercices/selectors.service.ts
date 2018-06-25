import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Event, SupplierType, Tag, TeamUser, User } from '~models';
import { Supplier } from '~models/supplier.model';
import { countries, currencies, harbours, incoTerms, lengthUnits, weightUnits } from '~utils/constants';

import { CategoryService, EventService, SupplierService, TagService } from '../../../global-services';
import { SupplierTypeService } from '../../../global-services/supplier-type/supplier-type.service';
import { TeamUserService } from '../../../global-services/team-user/team-user.service';
import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SelectorsService {

	constructor(
		private supplierSrv: SupplierService,
		private categorySrv: CategoryService,
		private eventSrv: EventService,
		private tagSrv: TagService,
		private teamUserSrv: TeamUserService,
		private supplierTypeSrv: SupplierTypeService
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
		return this.eventSrv.selectAll('id, alias');
	}

	getTags(): Observable<Tag[]> {
		return this.tagSrv.selectAll();
	}

	getSupplierTypes(): Observable<SupplierType[]> {
		return this.supplierTypeSrv.selectAll();
	}

	getUsers(): Observable<User[]> {
		return this.teamUserSrv.selectAll().pipe(
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

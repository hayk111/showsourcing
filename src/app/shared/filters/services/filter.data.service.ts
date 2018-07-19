import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier, Category, TeamUser, ProductStatus, Tag, Project, Event } from '~models';
import { FilterType } from '~shared/filters/models';

import { CategoryService, EventService, ProductStatusTypeService, ProjectService, TagService } from '../../../global-services';
import { SupplierService } from '../../../global-services/supplier/supplier.service';
import { TeamUserService } from '../../../global-services/team-user/team-user.service';

@Injectable({ providedIn: 'root' })
export class FilterDataService {

	constructor(
		private supplierSrv: SupplierService,
		private eventSrv: EventService,
		private categorySrv: CategoryService,
		private tagSrv: TagService,
		private projectSrv: ProjectService,
		private teamUserSrv: TeamUserService,
		private productStatusTypeService: ProductStatusTypeService
	) { }

	selectChoices(type: FilterType) {
		switch (type) {
			case FilterType.SUPPLIER:
				return this.selectSuppliers();
			case FilterType.EVENT:
				return this.selectEvents();
			case FilterType.CATEGORY:
				return this.selectCategories();
			case FilterType.TAGS:
			case FilterType.TAG:
				return this.selectTags();
			case FilterType.PROJECTS:
			case FilterType.PROJECT:
				return this.selectProjects();
			case FilterType.CREATED_BY:
				return this.selectUsers();
			case FilterType.PRODUCT_STATUS_TYPE:
				return this.selectProductStatuses();
			default: throw Error(`selection for type ${type}, not implemented yet`);
		}

	}

	private selectSuppliers(): Observable<Supplier[]> {
		return this.supplierSrv.selectAll();
	}

	private selectEvents(): Observable<any[]> {
		return this.eventSrv.selectAll();
	}

	private selectCategories(): Observable<Category[]> {
		return this.categorySrv.selectAll();
	}

	private selectTags(): Observable<Tag[]> {
		return this.tagSrv.selectAll();
	}

	private selectProjects(): Observable<Project[]> {
		return this.projectSrv.selectAll();
	}

	private selectUsers(): Observable<TeamUser[]> {
		return this.teamUserSrv.selectAll();
	}

	private selectProductStatuses(): Observable<ProductStatus[]> {
		return this.productStatusTypeService.selectAll();
	}

}

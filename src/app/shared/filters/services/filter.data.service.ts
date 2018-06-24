import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '~models';
import { FilterType } from '~shared/filters/models';

import { CategoryService, EventService, ProductStatusService, ProjectService, TagService } from '../../../global-services';
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
		private productStatusService: ProductStatusService
	) { }

	selectChoices(type: FilterType) {
		switch (type) {
			case FilterType.SUPPLIER:
				return this.selectSuppliers();
			case FilterType.EVENT:
				return this.selectEvents();
			case FilterType.CATEGORY:
				return this.selectCategories();
			case FilterType.TAG:
				return this.selectTags();
			case FilterType.PROJECT:
				return this.selectProjects();
			case FilterType.CREATED_BY:
				return this.selectUsers();
			case FilterType.PRODUCT_STATUS:
				return this.selectProductStatuses();
			default: throw Error(`selection for type ${type}, not implemented yet`);
		}

	}

	private selectSuppliers(): Observable<Supplier[]> {
		return this.supplierSrv.selectAll();
	}

	private selectEvents(): Observable<Supplier[]> {
		return this.eventSrv.selectAll('id, alias');
	}

	private selectCategories(): Observable<Supplier[]> {
		return this.categorySrv.selectAll();
	}

	private selectTags(): Observable<Supplier[]> {
		return this.tagSrv.selectAll();
	}

	private selectProjects(): Observable<Supplier[]> {
		return this.projectSrv.selectAll();
	}

	private selectUsers(): Observable<Supplier[]> {
		return this.teamUserSrv.selectAll();
	}

	private selectProductStatuses(): Observable<Supplier[]> {
		return this.productStatusService.selectAll();
	}

}

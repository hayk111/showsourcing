import { Injectable } from '@angular/core';
import { TeamUserService, UserService } from '~entity-services';
import { GlobalService } from '~entity-services/_global/global.service';
import { CategoryService } from '~entity-services/category/category.service';
import { EventService } from '~entity-services/event/event.service';
import { ImageService } from '~entity-services/image/image.service';
import { ProductService } from '~entity-services/product/product.service';
import { ProjectService } from '~entity-services/project/project.service';
import { SampleStatusService } from '~entity-services/sample-status/sample-status.service';
import { SampleService } from '~entity-services/sample/sample.service';
import { SupplierService } from '~entity-services/supplier/supplier.service';
import { TagService } from '~entity-services/tag/tag.service';
import { TeamService } from '~entity-services/team/team.service';
import { EntityMetadata, ERM } from '~models';

import { CountryService } from '../country/country.service';
import { CurrencyService } from '../currency/currency.service';
import { HarbourService } from '../harbour/harbour.service';
import { IncoTermService } from '../inco-term/inco-term.service';
import { InvitationService } from '../invitation/invitation.service';
import { ProductStatusService } from '../product-status/product-status.service';
import { SupplierStatusService } from '../supplier-status/supplier-status.service';
import { SupplierTypeService } from '../supplier-type/supplier-type.service';
import { TaskService } from '../task/task.service';

@Injectable(
	{ providedIn: 'root' }
)
export class ERMService {

	constructor(
		private categoryService: CategoryService,
		private countryService: CountryService,
		private currencyService: CurrencyService,
		private eventService: EventService,
		private harbourService: HarbourService,
		private imageService: ImageService,
		private incotermService: IncoTermService,
		private invitationSrv: InvitationService,
		private productService: ProductService,
		private productStatusSrv: ProductStatusService,
		private projectService: ProjectService,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private supplierService: SupplierService,
		private supplierStatusSrv: SupplierStatusService,
		private supplierTypeSrv: SupplierTypeService,
		private tagService: TagService,
		private taskSrv: TaskService,
		private teamService: TeamService,
		private teamUserSrv: TeamUserService,
		private userSrv: UserService
	) { }


	getGlobalServiceForEntity({ __typename: typename }: { __typename?: string })
		: GlobalService<any> {
		switch (typename) {
			case 'Category':
				return this.categoryService;
			case 'Country':
				return this.countryService;
			case 'Currency':
				return this.currencyService;
			case 'Supplier':
				return this.supplierService;
			case 'Product':
				return this.productService;
			case 'Project':
				return this.projectService;
			case 'Image':
				return this.imageService;
			case 'Tag':
				return this.tagService;
			case 'Event':
				return this.eventService;
			case 'Harbour':
				return this.harbourService;
			case 'Incoterm':
				return this.incotermService;
			case 'Team':
				return this.teamService;
			case 'User':
				return this.userSrv;
			case 'TeamUser':
				return this.teamUserSrv;
			case 'Sample':
				return this.sampleSrv;
			case 'SampleStatus':
				return this.sampleStatusSrv;
			case 'ProductStatus':
				return this.productStatusSrv;
			case 'SupplierStatus':
				return this.supplierStatusSrv;
			default:
				throw Error(`__typename ${typename} wasn't found`);
		}
	}

	getGlobalService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.CATEGORY:
				return this.categoryService;
			case ERM.COUNTRY:
				return this.countryService;
			case ERM.CURRENCY:
				return this.currencyService;
			case ERM.HARBOUR:
				return this.harbourService;
			case ERM.INCOTERM:
				return this.incotermService;
			case ERM.SUPPLIER:
				return this.supplierService;
			case ERM.PRODUCT:
				return this.productService;
			case ERM.PROJECT:
				return this.projectService;
			case ERM.IMAGE:
				return this.imageService;
			case ERM.INVITATION:
				return this.invitationSrv;
			case ERM.TAG:
				return this.tagService;
			case ERM.EVENT:
				return this.eventService;
			case ERM.TEAM:
				return this.teamService;
			case ERM.USER:
				return this.userSrv;
			case ERM.TEAM_USER:
				return this.teamUserSrv;
			case ERM.SAMPLE:
				return this.sampleSrv;
			case ERM.SAMPLE_STATUS:
				return this.sampleStatusSrv;
			case ERM.PRODUCT_STATUS:
				return this.productStatusSrv;
			case ERM.SUPPLIER_STATUS:
				return this.supplierStatusSrv;
			case ERM.SUPPLIER_TYPE:
				return this.supplierTypeSrv;
			case ERM.TASK:
				return this.taskSrv;
			default:
				throw Error(`The ERM "${erm.singular}" has not an associated service`);
		}
	}

	getStatusService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.SAMPLE:
				return this.sampleStatusSrv;
			case ERM.SUPPLIER_STATUS:
				return this.supplierStatusSrv;
			case ERM.PRODUCT_STATUS:
				return this.productStatusSrv;
			default:
				throw Error(`The ERM "${erm.singular}" has not an associated status service`);
		}
	}
}

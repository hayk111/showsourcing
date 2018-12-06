import { Injectable } from '@angular/core';
import { TeamUserService, UserService } from '~entity-services';
import { GlobalService } from '~entity-services/_global/global.service';
import { CategoryService } from '~entity-services/category/category.service';
import { EventService } from '~entity-services/event/event.service';
import { ImageService } from '~entity-services/image/image.service';
import { ProductService } from '~entity-services/product/product.service';
import { ProjectService } from '~entity-services/project/project.service';
import { SupplierService } from '~entity-services/supplier/supplier.service';
import { TagService } from '~entity-services/tag/tag.service';
import { TeamService } from '~entity-services/team/team.service';
import { EntityMetadata, ERM } from '~models';
import { SampleService } from '~entity-services/sample/sample.service';
import { SampleStatusService } from '~entity-services/sample-status/sample-status.service';

@Injectable(
	{ providedIn: 'root' }
)
export class ERMService {

	constructor(
		private categoryService: CategoryService,
		private tagService: TagService,
		private supplierService: SupplierService,
		private productService: ProductService,
		private projectService: ProjectService,
		private imageService: ImageService,
		private eventService: EventService,
		private teamService: TeamService,
		private teamUserSrv: TeamUserService,
		private userSrv: UserService,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService
	) { }


	getGlobalService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.CATEGORY:
				return this.categoryService;
			case ERM.SUPPLIER:
				return this.supplierService;
			case ERM.PRODUCT:
				return this.productService;
			case ERM.PROJECT:
				return this.projectService;
			case ERM.IMAGE:
				return this.imageService;
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
			default:
				throw Error(`This ERM has not an associated service`);
		}
	}

	getStatusService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.SAMPLE:
				return this.sampleStatusSrv;
			default:
				throw Error(`This ERM has not an associated status service`);
		}
	}
}

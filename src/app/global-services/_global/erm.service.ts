import { EntityMetadata, ERM } from '~models';
import { GlobalService } from '~global-services/_global/global.service';
import { CategoryService } from '~global-services/category/category.service';
import { TagService } from '~global-services/tag/tag.service';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { ProductService } from '~global-services/product/product.service';
import { ProjectService } from '~global-services/project/project.service';
import { ImageService } from '~global-services/image/image.service';
import { Injectable } from '@angular/core';
import { EventService } from '~global-services/event/event.service';

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
		private eventService: EventService) { }

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
			default:
				throw Error(`This ERM has not an associated service`);
		}
	}
}

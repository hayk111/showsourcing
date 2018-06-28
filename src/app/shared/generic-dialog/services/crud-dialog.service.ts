import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService, EventService, TagService, ProductService, SupplierService, ProjectService } from '~global-services';
import { Category, EntityMetadata, ERM, Event, Tag, Supplier, Product, Project } from '~models';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CrudDialogService {

	constructor(
		private categorySrv: CategoryService,
		private tagSrv: TagService,
		private eventSrv: EventService,
		private supplierSrv: SupplierService,
		private productSrv: ProductService,
		private projectSrv: ProjectService) { }

	create(item: FormGroup, type: EntityMetadata) {
		const name = item.value.name;
		// TODO change this switch cases
		switch (type) {
			case ERM.CATEGORY:
				const category = new Category({ name });
				return this.categorySrv.create(category);
			case ERM.TAG:
				const tag = new Tag({ name });
				return this.tagSrv.create(tag);
			case ERM.EVENT:
				const alias = item.value.name;
				const event = new Event({ alias });
				return this.eventSrv.create(event);
			case ERM.SUPPLIER:
				const supplier = new Supplier({ name });
				return this.supplierSrv.create(supplier);
			case ERM.PRODUCT:
				const product = new Product({ name });
				return this.productSrv.create(product);
			case ERM.PROJECT:
				const project = new Project({ name });
				return this.projectSrv.create(project);
			default:
				throwError(`this create dialog is not implemented yet`);
				break;
		}
	}
	edit(item: FormGroup, type: EntityMetadata) {
		switch (type) {
			default:
				throwError(`this edit dialog is not implemented yet`);
				break;
		}
	}
	merge(item: FormGroup, type: EntityMetadata) {
		switch (type) {
			default:
				throwError(`this merge dialog is not implemented yet`);
				break;
		}
	}
}

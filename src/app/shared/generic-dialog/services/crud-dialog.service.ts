import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService, EventService, TagService, ProductService, SupplierService, ProjectService } from '~global-services';
import { Category, EntityMetadata, ERM, Event, Tag, Supplier, Product, Project } from '~models';
import { throwError, Observable } from 'rxjs';
import { ERMService } from '~global-services/_global/erm.service';
import { map, first } from 'rxjs/operators';
import { SelectParams } from '~global-services/_global/select-params';
import { of } from 'rxjs';

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
				const event = new Event({ name });
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
				throw Error(`this create dialog is not implemented yet`);
		}
	}

	edit(item: FormGroup, type: EntityMetadata, entity: any) {
		// care with event name
		entity.name = item.value.name;
		switch (type) {
			case ERM.CATEGORY:
				return this.categorySrv.update(entity);
			case ERM.TAG:
				return this.tagSrv.update(entity);
			case ERM.EVENT:
				return this.eventSrv.update(entity);
			case ERM.SUPPLIER:
				return this.supplierSrv.update(entity);
			case ERM.PRODUCT:
				return this.productSrv.update(entity);
			case ERM.PROJECT:
				return this.projectSrv.update(entity);
			default:
				throw Error(`this edit dialog is not implemented yet`);
		}
	}
	merge(item: FormGroup, type: EntityMetadata, entities: Array<any>): Observable<any> {
		switch (type) {
			default:
				throw Error(`this merge dialog is not implemented yet`);
		}
	}

	checkExists(ermService: ERMService, type: EntityMetadata, valueInput: string) {
		return ermService.getGlobalService(type)
			.selectMany(of(new SelectParams({ query: `name == "${valueInput}"` })))
			.pipe(
				map(res => res.length > 0)
			);
	}
}



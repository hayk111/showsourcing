import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CategoryService, EventService, TagService } from '~global-services';
import { Category, EntityMetadata, ERM, Event, Tag } from '~models';

@Injectable({
	providedIn: 'root'
})
export class CrudDialogService {

	constructor(
		private categorySrv: CategoryService,
		private tagSrv: TagService,
		private eventSrv: EventService) { }

	create(item: FormGroup, type: EntityMetadata) {
		const name = item.value.name;
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
			default:
				break;
		}
	}
	edit(item: FormGroup, type: EntityMetadata) {
		switch (type) {
			case ERM.CATEGORY:
				break;
			case ERM.TAG:
				break;
			case ERM.EVENT:
				break;
			default:
				break;
		}
	}
	merge(item: FormGroup, type: EntityMetadata) {
		switch (type) {
			case ERM.CATEGORY:
				break;
			case ERM.TAG:
				break;
			case ERM.EVENT:
				break;
			default:
				break;
		}
	}
}

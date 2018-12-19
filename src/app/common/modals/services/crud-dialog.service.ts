import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ERMService } from '~entity-services/_global/erm.service';
import { EntityMetadata } from '~models';

@Injectable({
	providedIn: 'root'
})
export class CrudDialogService {

	constructor(private ermService: ERMService) { }

	create(item: FormGroup, type: EntityMetadata) {
		const name = item.value.name;
		const entity = new type.constClass({ name });
		return this.ermService.getGlobalService(type).create(entity);
	}

	edit(item: FormGroup, type: EntityMetadata, entity: any) {
		const name = item.value.name;
		return this.ermService.getGlobalService(type).update({ id: entity.id, name });
	}

	merge(item: FormGroup, type: EntityMetadata, entities: Array<any>): Observable<any> {
		throw Error(`this merge dialog is not implemented yet`);
	}

	checkExists(type: EntityMetadata, valueInput: string) {
		return this.ermService.getGlobalService(type)
			.queryOneByPredicate(`name == "${valueInput.trim()}"`, ['id', 'name'])
			.pipe(first());
	}
}



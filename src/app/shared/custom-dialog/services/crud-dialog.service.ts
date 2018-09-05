import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, first } from 'rxjs/operators';
import { ERMService } from '~global-services/_global/erm.service';
import { SelectParams } from '~global-services/_global/select-params';
import { EntityMetadata, ERM } from '~models';

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
		return this.ermService.getGlobalService(type).update({ id: entity.id, name }, 'name');
	}

	merge(item: FormGroup, type: EntityMetadata, entities: Array<any>): Observable<any> {
		throw Error(`this merge dialog is not implemented yet`);
	}

	checkExists(type: EntityMetadata, valueInput: string) {
		return this.ermService.getGlobalService(type)
			.queryOneByPredicate(`name == "${valueInput.trim()}"`)
			.pipe(first());
	}
}



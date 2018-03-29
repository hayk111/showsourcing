import { Pipe, PipeTransform } from '@angular/core';
import { EntityPipe } from './entity.pipe';
import { Store } from '@ngrx/store';

@Pipe({ name: 'entityName' })
export class EntityNamePipe extends EntityPipe implements PipeTransform {

	constructor(public store: Store<any>) {
		super(store);
	}

	transform(value: string, entityName: string): any {
		return super.transform(value, entityName, 'name');
	}

}

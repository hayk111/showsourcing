import { Pipe, PipeTransform } from '@angular/core';
import { EntityPipe } from './entity.pipe';

@Pipe({name: 'entityName'})
export class EntityNamePipe extends EntityPipe implements PipeTransform {

	transform(value: string, entityName: string): any {
		return super.transform(value, entityName, 'name');
	}

}

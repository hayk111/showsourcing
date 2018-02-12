import { Pipe, PipeTransform } from '@angular/core';
import { EntityNamePipe } from './entity-name.pipe';
import { selectEntityById } from '../selectors/misc/utils.selector';
import { takeUntil, filter, map } from 'rxjs/operators';

@Pipe({
	name: 'entityExist'
})
export class EntityExistPipe extends EntityNamePipe implements PipeTransform {

	transform(value: string, entityName: string): any {
		if (!value) return false;
		const entityId = value;
		const entityRepr = this.getRepr(entityName);
		return this.store.select(selectEntityById({ entityId, entityRepr }))
			.pipe(
				takeUntil(this._destroy$),
				map(o => !!o)
			);
	}

}

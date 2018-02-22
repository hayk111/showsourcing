import { Pipe, PipeTransform } from '@angular/core';
import { selectEntityById } from '../selectors/misc/utils.selector';
import { takeUntil, map } from 'rxjs/operators';
import { EntityPipe } from './entity.pipe';

@Pipe({
	name: 'entityExist'
})
export class EntityExistPipe extends EntityPipe implements PipeTransform {

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

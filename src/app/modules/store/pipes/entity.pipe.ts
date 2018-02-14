import { Pipe, PipeTransform } from '@angular/core';
import { EntityNamePipe } from './entity-name.pipe';
import { selectEntityById } from '../selectors/misc/utils.selector';
import { entityRepresentationMap } from '../utils/entities.utils';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '../../../utils/auto-unsub.component';
import { takeUntil, map } from 'rxjs/operators';


@Pipe({
	name: 'entity'
})
export class EntityPipe extends AutoUnsub implements PipeTransform {

	constructor(protected store: Store<any>) {
		super();
	}

	transform(value: string, entityName: string, prop: string): any {
		if (!value) return false;
		const entityId = value;
		const entityRepr = this.getRepr(entityName);
		return this.store.select(selectEntityById({ entityId, entityRepr }))
			.pipe(
				takeUntil(this._destroy$),
				map(entity => {
					// if a prop is defined we return said prop
					if (prop) {
						if (entity)
							return entity[prop];
						else
							return '';
					}
					else
						return entity;
				})
			);
	}

	protected getRepr(name: string) {
		if (!name) {
			throw new Error(`Hey, You forgot to give the entityName an entityName as argument`);
		}
		const repr = entityRepresentationMap[name];
		if (!repr) {
			throw new Error(`Hey, the entity representation with name ${name} was not found.
			Be sure the name you used is the same as in the store buddy.`);
		}
		return repr;
	}

}

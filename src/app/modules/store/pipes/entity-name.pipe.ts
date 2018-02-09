import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { selectEntityById } from '../selectors/misc/utils.selector';
import { entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';
import { AutoUnsub } from '../../../utils/auto-unsub.component';
import { tap, filter, takeUntil } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Pipe({name: 'entityName'})
export class EntityNamePipe extends AutoUnsub implements PipeTransform {

	constructor(protected store: Store<any>) {
		super();
	}

	transform(value: string, entityName: string): any {
		if (!value) return of(value);
		const entityId = value;
		const entityRepr = this.getRepr(entityName);
		return this.store.select(selectEntityById({ entityId, entityRepr }))
			.pipe(
				takeUntil(this._destroy$),
				filter(o => o),
				map(entity => entity.name)
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

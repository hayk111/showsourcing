import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { selectEntityById } from '../selectors/utils.selector';
import { entityRepresentationMap, EntityRepresentation } from '../utils/entities.utils';
import { AutoUnsub } from '../../../utils/auto-unsub.component';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Pipe({name: 'entityName'})
export class EntityNamePipe extends AutoUnsub implements PipeTransform {

	constructor(private store: Store<any>) {
		super();
	}

	transform(value: string, entityName: string): any {
		if (!value) return of(value);
		const entityId = value;
		const entityRepr = this.getRepr(entityName);
		return this.store.select(selectEntityById({ entityId, entityRepr }))
			.takeUntil(this._destroy$).pipe(
				map(entity => entity.name),
			);
	}

	private getRepr(name: string) {
		if (!name) {
			throw new Error(`Hey, You forgot to give the entityName an entityName as argument`);
		}
		const repr = entityRepresentationMap[name];
		if (!repr) {
			throw new Error(`Hey, this entity representation was not found.
			Be sure the name you used is the same as in the store buddy.`);
		}
		return repr;
	}
}

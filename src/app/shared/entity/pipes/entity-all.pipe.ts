import { selectEntityArray } from '~entity/store';
import { ERM, EntityRepresentation } from './../models/entities.model';
import { selectMultipleById } from './../store';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';

@Pipe({
	name: 'entityList',
})
export class EntityListPipe extends AutoUnsub implements PipeTransform {
	constructor(protected store: Store<any>) {
		super();
	}

	transform(entityRep: EntityRepresentation): any {
		return this.store.select(selectEntityArray(entityRep)).pipe(takeUntil(this._destroy$));
	}
}

import { ERM } from './../models/entities.model';
import { selectMultipleById } from './../store';
import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';

@Pipe({
	name: 'entityArray',
})
export class EntityArrayPipe extends AutoUnsub implements PipeTransform {
	constructor(protected store: Store<any>) {
		super();
	}

	transform(ids: Array<string>, entityName: string): any {
		if (!ids) return [];

		const entityRepr = this.getRepr(entityName);
		return this.store.select(selectMultipleById(entityRepr, ids)).pipe(takeUntil(this._destroy$));
	}

	protected getRepr(name: string) {
		if (!name) {
			throw new Error(`Hey, You forgot to give the entityName an entityName as argument`);
		}
		const repr = ERM[name];
		if (!repr) {
			throw new Error(`Hey, the entity representation with name ${name} was not found.
			Be sure the name you used is the same as in the store buddy.`);
		}
		return repr;
	}
}

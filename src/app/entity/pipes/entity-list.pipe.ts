import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { selectEntityArrayByName } from '~entity/store/entity.selector';

@Pipe({
	name: 'entityList',
})
export class EntityListPipe extends AutoUnsub implements PipeTransform {
	constructor(protected store: Store<any>) {
		super();
	}

	transform(entityName: string): any {
		return this.store.select(selectEntityArrayByName(entityName)).pipe(takeUntil(this._destroy$));
	}
}

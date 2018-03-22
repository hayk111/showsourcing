import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { CategoryActionTypes as ActionType, CategoryActions } from '../../action/entities/index';
import { CategoryService } from '../../services/category.service';
import { EntityService, ERM } from '~app/shared/entity';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class CategoryEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => CategoryActions.add(result)));

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.categories)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.categories })))
			)
		);

	constructor(private action$: Actions, private srv: CategoryService, private entitySrv: EntityService) {}
}

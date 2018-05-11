import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { fromCategory } from './category.bundle';
import { CategoryHttpService } from './category-http.service';
import { EntityService } from '~app/entity/store/entity.service';
import { ERM } from '~app/entity/store/entity.model';

import { forkJoin } from 'rxjs';
const ActionType = fromCategory.ActionTypes;

@Injectable()
export class CategoryEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map((result: any) => fromCategory.Actions.add(result)));

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(ActionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.category)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(ActionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.category })))
			)
		);

	// loading product count for each entity
	@Effect()
	loadProductsCount$ = this.action$.ofType<any>(ActionType.LOAD_PRODUCT_COUNT).pipe(
		switchMap(_ => this.entitySrv.loadProductCount(ERM.category)),
		map((items: any) => fromCategory.Actions.setProductCount(items))
	);

	constructor(private action$: Actions, private srv: CategoryHttpService, private entitySrv: EntityService) { }
}

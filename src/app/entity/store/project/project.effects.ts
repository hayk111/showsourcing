import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { selectUserTeamId } from '../user';

import { ProjectHttpService } from './project-http.service';
import { fromProject } from './project.bundle';
import { forkJoin } from 'rxjs/observable/forkJoin';


const actionType = fromProject.ActionTypes;
const projectActions = fromProject.Actions;
@Injectable()
export class ProjectEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(actionType.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			map((result: any) => projectActions.add(result))
		);

	@Effect()
	loadProductsCount$ = this.action$.ofType<any>(actionType.LOAD_PRODUCT_COUNT).pipe(
		switchMap(_ => this.entitySrv.loadProductCount(ERM.project)),
		map((items: any) => projectActions.setProductCount(items))
	);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(actionType.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.project)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(actionType.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.project })))
			)
		);

	constructor(
		private action$: Actions,
		private store$: Store<any>,
		private srv: ProjectHttpService,
		private entitySrv: EntityService
	) { }
}

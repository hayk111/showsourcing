import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { EntityService } from '~entity/store/entity.service';
import { ERM } from '~entity/store/entity.model';
import { selectUserTeamId } from '../user';

import { ProjectHttpService } from './project-http.service';
import { projectActions, projectActionTypes as actionTypes } from './project.actions';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class ProjectEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(actionTypes.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			mergeMap((result: any) => [projectActions.add(result), projectActions.loadProductCount(ERM.project)])
		);

	@Effect()
	loadProductsCount$ = this.action$.ofType<any>(actionTypes.LOAD_PRODUCT_COUNT).pipe(
		withLatestFrom(this.store$.select(selectUserTeamId)),
		map(([action, teamid]) => {
			return { teamid, payload: action.payload };
		}),
		switchMap(({ teamid, payload }) => this.srv.getProductCount(payload, teamid)),
		map((items: Array<any>) => projectActions.setProductCount(items))
	);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(actionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.project)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(actionTypes.DELETE)
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

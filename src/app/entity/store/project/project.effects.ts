import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { ERM, EntityService } from '~entity';
import { selectUserTeamId } from '~user/store/selectors/user.selector';

import { ProjectHttpService } from '../services/project-http.service';
import { projectActions, actionTypes } from './project.actions';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class ProjectEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(actionTypes.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			mergeMap((result: any) => [projectActions.add(result), projectActions.loadProductCount(ERM.projects)])
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

	@Effect()
	addProducts$ = this.action$.ofType<any>(actionTypes.ADD_PRODUCTS).pipe(
		map(action => action.payload),
		switchMap(({ projects, products }) => {
			const obs$ = new Array<Observable<any>>();
			projects.forEach(projectid => {
				products.forEach(productid => {
					obs$.push(this.srv.addProduct(projectid, productid));
				});
			});
			const result = forkJoin(obs$);
			return result;
		}),
		switchMap((result: any) => [
			projectActions.addProductsSuccess(result),
			projectActions.loadProductCount(ERM.projects),
		])
	);

	@Effect({ dispatch: false })
	patch$ = this.action$
		.ofType<any>(actionTypes.PATCH)
		.pipe(map(action => action.payload), switchMap((p: any) => this.entitySrv.patch(p, ERM.projects)));

	@Effect({ dispatch: false })
	delete$ = this.action$
		.ofType<any>(actionTypes.DELETE)
		.pipe(
			map(action => action.payload),
			switchMap((ids: Array<string>) =>
				forkJoin(ids.map(id => this.entitySrv.delete({ targetId: id, target: ERM.projects })))
			)
		);

	constructor(
		private action$: Actions,
		private store$: Store<any>,
		private srv: ProjectHttpService,
		private entitySrv: EntityService
	) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ERM } from '~entity';
import { selectUserTeamId } from '~user/store/selectors/user.selector';

import { ProjectService } from '../services/project.service';
import { ProjectActions, ProjectsActionTypes } from './project.actions';

@Injectable()
export class ProjectEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ProjectsActionTypes.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			mergeMap((result: any) => [
				ProjectActions.add(result),
				ProjectActions.loadProductCount(ERM.projects),
			])
		);

	@Effect()
	loadProductsCount$ = this.action$
		.ofType<any>(ProjectsActionTypes.LOAD_PRODUCT_COUNT)
		.withLatestFrom(this.store$.select(selectUserTeamId))
		.pipe(
			map(([action, teamid]) => {
				return { teamid, payload: action.payload };
			}),
			switchMap(({ teamid, payload }) => this.srv.getProductCount(payload, teamid)),
			map((items: Array<any>) => ProjectActions.setProductCount(items))
		);

	@Effect()
	addProducts$ = this.action$.ofType<any>(ProjectsActionTypes.ADD_PRODUCTS).pipe(
		map(action => action.payload),
		switchMap(({ projects, products }) => {
			const obs$ = new Array<Observable<any>>();
			projects.forEach(projectid => {
				products.forEach(productid => {
					obs$.push(this.srv.addProduct(projectid, productid));
				});
			});
			const result = Observable.forkJoin(obs$);
			return result;
		}),
		switchMap((result: any) => [
			ProjectActions.addProductsSuccess(result),
			ProjectActions.loadProductCount(ERM.projects),
		])
	);

	constructor(private action$: Actions, private store$: Store<any>, private srv: ProjectService) {}
}

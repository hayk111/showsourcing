import 'rxjs/add/operator/withLatestFrom';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { selectUserTeamId } from '~user/store/selectors/user.selector';

import { ProjectService } from '../../services/project.service';
import { ProjectActions, ProjectsActionTypes } from '../actions';

@Injectable()
export class ProjectEffects {
	@Effect()
	load$ = this.action$
		.ofType<any>(ProjectsActionTypes.LOAD)
		.pipe(
			switchMap(_ => this.srv.load()),
			map((result: any) => ProjectActions.add(result))
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

	constructor(
		private action$: Actions,
		private store$: Store<any>,
		private srv: ProjectService
	) {}
}

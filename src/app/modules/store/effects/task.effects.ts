import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionType, TaskActions } from '../action/task.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TaskService } from '../services/task.service';

@Injectable()
export class TaskEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(filterGroupName => {
			// get products
			return this.srv.load(filterGroupName).pipe(
				// set products
				map(r => TaskActions.set(r)),
				// before everything set products as pending
				startWith(TaskActions.setPending() as any)
			);
		})
	);

	// @Effect()
	// loadForTarget$ = this.actions$.ofType<any>(Act)


	constructor(private srv: TaskService, private actions$: Actions) {}


}

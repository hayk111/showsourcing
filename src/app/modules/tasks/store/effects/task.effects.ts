import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, startWith, switchMap } from 'rxjs/operators';
import { TaskService } from '~tasks/services/task.service';
import { TaskActions, ActionType } from '../actions';
@Injectable()
export class TaskEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(filterGroupName => {
			// get products
			return this.srv.load(filterGroupName).pipe(
				// set products
				map(r => TaskActions.add(r)),
				// before everything set products as pending
				startWith(TaskActions.setPending() as any)
			);
		})
	);

	constructor(private srv: TaskService, private actions$: Actions) {}


}

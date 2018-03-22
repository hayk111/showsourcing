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
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => TaskActions.set(r))
			);
		})
	);

	constructor(private srv: TaskService, private actions$: Actions) {}
}

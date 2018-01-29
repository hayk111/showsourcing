import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, TaskActions } from '../../action/entities/task.action';
import { map, startWith, switchMap } from 'rxjs/operators';
import { TaskService } from '../../services/task.service';

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

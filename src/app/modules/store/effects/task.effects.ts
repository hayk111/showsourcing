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
				map(r => TaskActions.setData(r)),
				// before everything set products as pending
				startWith(TaskActions.setPending() as any)
			);
		})
	);

	// // Listen for the patch action
	@Effect({ dispatch: false })
	patch$: Observable<any> = this.actions$.ofType(ActionType.PATCH_PROPERTY)
		.map((action: TypedAction<any>) => action.payload)
		.pipe(
			switchMap(p => this.srv.sendPatchRequest(p))
		);

	constructor(private srv: TaskService, private actions$: Actions) {}


}

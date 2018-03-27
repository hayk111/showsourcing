import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, startWith, switchMap } from 'rxjs/operators';
import { taskActionType as actionType, taskActions } from './task.action';
import { TaskHttpService } from './task-http.service';
import { FocussedEntityService } from '../focussedEntity';

@Injectable()
export class TaskEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(actionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => taskActions.set(r))
			);
		})
	);

	// loads comments for current selection
	@Effect()
	loadForSelection$ = this.actions$
		.ofType<any>(actionType.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.focusSrv.getSelection()),
			switchMap(target => this.srv.loadForTarget(target)),
			map((r: any) => taskActions.set(r))
		);

	constructor(private srv: TaskHttpService, private actions$: Actions, private focusSrv: FocussedEntityService) { }
}

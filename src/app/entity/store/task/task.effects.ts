import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, startWith, switchMap } from 'rxjs/operators';
import { fromTask } from './task.bundle';
import { TaskHttpService } from './task-http.service';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';

@Injectable()
export class TaskEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(fromTask.ActionTypes.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: any) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => fromTask.Actions.set(r))
			);
		})
	);

	// loads tasks for current selection
	@Effect()
	loadForSelection$ = this.actions$
		.ofType<any>(fromTask.ActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			map(_ => this.focusSrv.target),
			switchMap((target: any) => this.srv.loadForTarget(target)),
			map((r: any) => fromTask.Actions.set(r))
		);

	constructor(private srv: TaskHttpService, private actions$: Actions, private focusSrv: FocusedEntityService) { }
}

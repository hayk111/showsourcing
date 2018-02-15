import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, mergeMap } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ActionType, TaskSlctnActions } from '../../action/selection/task-selection.action';
import { TaskService } from '../../services/task.service';
import { TaskActions } from '../../action/entities/task.action';


@Injectable()
export class TaskSelectionEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.loadForTarget(target)),
		mergeMap((r: any) => [
			TaskSlctnActions.set(r),
			TaskActions.add(r)
		])
	);


	constructor(private actions$: Actions, private srv: TaskService, private selectionSrv: SelectionService) {}
}

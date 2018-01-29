import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ActionType, TaskSlctnActions } from '../../action/selection/task-selection.action';
import { TaskService } from '../../services/task.service';


@Injectable()
export class TaskSelectionEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		withLatestFrom( this.selectionSrv.getSelection(), (_, target ) => target),
		switchMap(target => this.srv.loadForTarget(target)),
		map((r: any) => TaskSlctnActions.add(r))
	);

	constructor(private actions$: Actions, private srv: TaskService, private selectionSrv: SelectionService) {}
}

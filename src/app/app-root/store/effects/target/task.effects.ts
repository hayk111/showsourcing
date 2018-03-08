import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ActionType, TaskTargetActions } from '../../action/target/task.action';
import { TaskActions } from '../../action/entities';
import { EntityService } from '../../services/entity.service';
import { ERM } from '~entity';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '../../action/misc/app-errors.action';
import {
	FeedbackDlgActions,
	FeedbackStyle,
} from '../../action/ui/feedback-dlg.action';

@Injectable()
export class TaskTargetEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.loadForTarget(ERM.tasks, target)),
		mergeMap((r: any) => [TaskTargetActions.set(r), TaskActions.add(r)])
	);

	@Effect()
	add$ = this.actions$.ofType<any>(ActionType.ADD).pipe(
		map(action => action.payload),
		switchMap(task =>
			this.srv.addForTarget(task, ERM.tasks, this.selectionSrv.currentTarget).pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				mergeMap((r: any) => [
					TaskTargetActions.replace(task, r),
					FeedbackDlgActions.add({
						styleType: FeedbackStyle.SUCCESS,
						title: 'Task added',
						body: 'Your task was added',
					}),
				]),

				catchError(e => of(AppErrorActions.add(e)))
			)
		)
	);

	constructor(
		private actions$: Actions,
		private srv: EntityService,
		private selectionSrv: SelectionService
	) {}
}

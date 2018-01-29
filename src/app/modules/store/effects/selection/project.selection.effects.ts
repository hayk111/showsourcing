import { ActionType } from '../../action/selection/comment-selection.action';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ProjectSlctnActions } from '../../action/selection/project-selection.action';


@Injectable()
export class ProjectSelectionEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		withLatestFrom( this.selectionSrv.getSelection(), (_, target ) => target),
		switchMap(target => this.srv.loadForTarget(target)),
		map((r: any) => ProjectSlctnActions.add(r))
	);

	constructor(private actions$: Actions, private srv: ProjectService, private selectionSrv: SelectionService) {}
}

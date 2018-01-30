import { ActionType } from '../../action/selection/project-selection.action';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { SelectionService } from '../../services/selection.service';
import { Injectable } from '@angular/core';
import { ProjectSlctnActions } from '../../action/selection/project-selection.action';
import { Project } from '../../model/entities/project.model';


@Injectable()
export class ProjectSelectionEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.loadForTarget(target)),
		map((r: any) => ProjectSlctnActions.set(r))
	);

	@Effect({ dispatch: false })
	add$ = this.actions$.ofType<any>(ActionType.ADD).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (project, target) => ({project, target})),
		switchMap(({project, target}) => this.srv.addForTarget(project, target)),
	);

	constructor(private actions$: Actions, private srv: ProjectService, private selectionSrv: SelectionService) {}
}

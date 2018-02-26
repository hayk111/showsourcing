import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProjectService } from '~projects/services/project.service';

import { ActionType, ProjectTargetActions } from '../../action/target/project.action';
import { SelectionService } from '../../services/selection.service';

@Injectable()
export class ProjectTargetEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.loadForTarget(target)),
		map((r: any) => ProjectTargetActions.set(r))
	);

	@Effect({ dispatch: false })
	add$ = this.actions$
		.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom(this.selectionSrv.getSelection(), (project, target) => ({ project, target })),
			switchMap(({ project, target }) => this.srv.addForTarget(project, target))
		);

	constructor(private actions$: Actions, private srv: ProjectService, private selectionSrv: SelectionService) {}
}

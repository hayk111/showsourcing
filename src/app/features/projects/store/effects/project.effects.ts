import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ProjectActionTypes as ActionType, ProjectActions } from '~store/action/entities/index';
import { ProjectService } from '../../services/project.service';


@Injectable()
export class ProjectEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.srv.load()),
		map((result: any) => ProjectActions.add(result))
	);

	constructor( private action$: Actions, private srv: ProjectService) {}
}


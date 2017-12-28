import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ActionType, ProjectActions } from '../action/project.action';
import { ProjectService } from '../services/project.service';


@Injectable()
export class ProjectEffects {

	@Effect()
	load$ = this.action$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap(({id, maxCounter}) => this.srv.load(id, maxCounter)),
		map((result: any) => ProjectActions.addProjects(result))
	);

	constructor( private action$: Actions, private srv: ProjectService) {}
}


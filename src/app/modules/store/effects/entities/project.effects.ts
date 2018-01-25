import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { ProjectActions, ActionType } from '../../action/entities/project.action';

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


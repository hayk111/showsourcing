import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, tap } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { ProjectActions, ActionType } from '../../action/entities/project.action';
import { Project } from '../../model/entities/project.model';
import { TargetService } from '../../services/target.service';
import { EntityTarget } from '../../utils/entities.utils';

@Injectable()
export class ProjectEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map( action => action.payload ),
		switchMap( ({id, maxCounter}) => this.srv.load(id, maxCounter) ),
		map( (added: Array<Project>) => ProjectActions.add(added) )
	);


	constructor( private actions$: Actions, private srv: ProjectService, private targetSrv: TargetService) {}
}


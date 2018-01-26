import { Injectable } from '@angular/core';
import { ActionType, TargetProjectActions } from '../../action/target/project.action';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../model/entities/project.model';


@Injectable()
export class TargetProjectEffects {

	@Effect()
	load$: Observable<any> = this.actions$.ofType<any>(ActionType.LOAD)
	.pipe(
		map(action => action.payload),
		switchMap(target => this.srv.loadForTarget(target)),
		// we only need the id in target/projects since we are gonna find the real tags in entities/projects
		map((projects: Array<Project>) => projects.map(t => t.id)),
		map(ids => TargetProjectActions.set(ids))
	);

	@Effect({ dispatch: false })
	add$ = this.actions$.ofType<any>(ActionType.ADD)
	.pipe(
		map(action => action.payload),
		switchMap(p => this.srv.addForTarget(p.project, p.target))
	);


	@Effect({ dispatch: false })
	remove$ = this.actions$.ofType<any>(ActionType.REMOVE)
	.pipe(
		map(action => action.payload),
		switchMap(p => this.srv.removeForTarget(p.project, p.target))
	);

	constructor(private actions$: Actions, private srv: ProjectService) {}

}


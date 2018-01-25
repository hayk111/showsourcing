import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { ProductActions, ActionType } from '../../action/entities/product.action';
import { switchMap, startWith, filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { FileActions } from '../../action/entities/file.action';
import { AppFile } from '../../model/entities/app-file.model';
import { ProductService } from '../../services/product.service';
import { AppComment } from '../../model/entities/comment.model';
import { EntityTarget, entityRepresentationMap } from '../../utils/entities.utils';
import { AddTarget, ReplaceTarget } from '../../utils/target.utils';
import { Project } from '../../model/entities/project.model';
import { TargetService } from '../../services/target.service';
import { CommentActions } from '../../action/entities/comment.action';
import { CommentService } from '../../services/comment.service';
import { ProjectService } from '../../services/project.service';
import { TagService } from '../../services/tag.service';
import { TaskService } from '../../services/task.service';
import { Tag } from '../../model/entities/tag.model';
import { Task } from '../../model/entities/task.model';

@Injectable()
export class ProductEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((params: {teamId, counter}) => {
			// get products
			return this.srv.load(params).pipe(
				// set products
				map((r: any) => ProductActions.add(r))
			);
		})
	);


	@Effect()
	downloadPdf$ = this.actions$.ofType<any>(ActionType.REQUEST_PDF).pipe(
		map(action => action.payload),
		switchMap(id => this.srv.sendPdfReq(id)),
		map(path => FileActions.download({ url: path } as AppFile))
	);

	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType<any>(ActionType.PATCH).pipe(
		map(action => action.payload),
		switchMap((p: any) => this.srv.sendPatchRequest(p))
	);

	@Effect()
	loadComments$ = this.actions$.ofType<any>(ActionType.LOAD_COMMENTS).pipe(
		switchMap(_ => this.targetSrv.getTarget()),
		switchMap(
			(target: EntityTarget) => this.commentSrv.load(target),
			(target: EntityTarget, comments: Array<AppComment>) => [
			 ProductActions.addComments(comments, target),
			 CommentActions.add(comments)
			]
		)
	);

	@Effect()
	createComments$ = this.actions$.ofType<any>(ActionType.CREATE_COMMENT).pipe(
		map(action => action.payload),
		withLatestFrom(this.targetSrv.getTarget(), (comment, target) => ({ comment, target })),
		switchMap((p: any) => this.commentSrv.postComment(p.comment, p.target).pipe(
			// mergeMap for handling request
			// catchError
			startWith([
				ProductActions.addComments([p.comment], p.target),
				CommentActions.add(p.comment)
			])
		)),
	);

	@Effect()
	loadProject$ = this.actions$.ofType<any>(ActionType.LOAD_PROJECT).pipe(
		switchMap(_ => this.targetSrv.getTarget()),
		switchMap(
			(target: EntityTarget) => this.projectSrv.loadForTarget(target),
			// we only need to add the id to the product since all projects are loaded at startup
			// (for no confusion, this effect happens when we load the projects for a product)
			(target: EntityTarget, projects: Array<Project>) => ProductActions.addProjects(projects, target)
		)
	);

	@Effect()
	loadTags$ = this.actions$.ofType<any>(ActionType.LOAD_TAGS).pipe(
		switchMap(_ => this.targetSrv.getTarget()),
		switchMap(
			(target: EntityTarget) => this.tagSrv.loadForTarget(target),
			// we only need to add the id to the product since all tags are loaded at startup
			(target: EntityTarget, tags: Array<Tag>) => ProductActions.addTags(tags, target)
		)
	);

	@Effect()
	loadTasks$ = this.actions$.ofType<any>(ActionType.LOAD_TASKS).pipe(
		switchMap(_ => this.targetSrv.getTarget()),
		switchMap(
			(target: EntityTarget) => this.taskSrv.loadForTarget(target),
			// we only need to add the id to the product since all tags are loaded at startup
			(target: EntityTarget, tasks: Array<Task>) => ProductActions.addTasks(tasks, target)
		)
	);

	constructor(private srv: ProductService, private actions$: Actions, private targetSrv: TargetService,
		private commentSrv: CommentService, private projectSrv: ProjectService, private tagSrv: TagService,
		private taskSrv: TaskService) {}

}

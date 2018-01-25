import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { EntityTarget } from '../../utils/entities.utils';
import { CommentService } from '../../services/comment.service';
import { withLatestFrom } from 'rxjs/operator/withLatestFrom';
import { ActionType, CommentActions } from '../../action/entities/comment.action';
import { AppComment } from '../../model/entities/comment.model';



@Injectable()
export class CommentEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map( action => action.payload),
		switchMap(() => this.targetSrv.selectTarget() ),
		switchMap( (target: EntityTarget) => this.srv.load(target) ),
		map( (comments: Array<AppComment>) => CommentActions.add(comments) )
	);

	@Effect()
	comment$ = this.actions$.ofType<any>(ActionType.CREATE).pipe(
		map(action => action.payload),
		withLatestFrom(this.targetSrv.selectTarget(), (comment, target) => { comment.target = target; return comment; })
		switchMap(
			(comment: AppComment) => this.srv.postComment(comment),
			(comment: AppComment, replacing: AppComment) => CommentActions.replace(comment.id, replacing, target) )
	);

	constructor(private actions$: Actions, private srv: CommentService) {}
}

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, CommentActions } from '../action/comment.action';
import { map, switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../model/filter.model';
import { EntityTarget } from '../utils/entities.utils';
import { AppComment } from '../model/comment.model';
import { CommentService } from '../services/comment.service';



@Injectable()
export class CommentEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map( action => action.payload),
		switchMap( (p: EntityTarget) => this.srv.load(p)),
		map((comments: Array<AppComment>) => CommentActions.setComments(comments))
	);


	// @Effect()
	// comment$ = this.actions$.ofType<any>(ActionType.ADD_NEW).pipe(
	// 	map(action => action.payload),
	// 	// we add an uuid to the payload to retrieve it easily, a timestamp will do
	// 	map(p => ({...p, pendingUuid: Date.now(), createdByUserId: this.userID })),
	// 	map(comment => ProductActions.addPendingComment(comment))
	// );

	// @Effect()
	// pendingComment$ = this.actions$.ofType<any>(ActionType.ADD_PENDING_COMMENT)
	// .pipe(
	// 	map(action => action.payload),
	// 	switchMap(
	// 		(comment: AppComment) => this.srv.postComment(comment),
	// 		(comment, r) => ProductActions.setCommentReady(comment.productId, comment.pendingUuid) )
	// );



	constructor(private actions$: Actions, private srv: CommentService) {}
}

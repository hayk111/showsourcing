import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, CommentActions } from '../action/comment.action';
import { map, switchMap } from 'rxjs/operators';
import { EntityRepresentation } from '../model/filter.model';
import { EntityTarget } from '../utils/entities.utils';
import { AppComment } from '../model/comment.model';
import { CommentService } from '../../shared/entities-services/comment.service';



@Injectable()
export class CommentEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map( action => action.payload),
		switchMap( (p: EntityTarget) => this.srv.load(p)),
		map((comments: Array<AppComment>) => CommentActions.setComments(comments))
	);


	constructor(private actions$: Actions, private srv: CommentService) {}
}

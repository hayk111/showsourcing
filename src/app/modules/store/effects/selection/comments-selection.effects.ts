import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentService } from '../../services/comment.service';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { ActionType, CommentSlctnActions } from '../../action/selection/comment-selection.action';
import { FileSlctnActions } from '../../action/selection/file-selection.action';



@Injectable()
export class CommentEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		withLatestFrom( this.selectionSrv.getSelection(), (_, target ) => target),
		switchMap(target => this.srv.load(target)),
		map((r: any) => CommentSlctnActions.add(r))
	);

	@Effect()
	createForSelection$ = this.actions$.ofType<any>(ActionType.CREATE)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (comment, target ) => ({ comment, target })),
			switchMap((p: any) => this.srv.create(p).pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				map((r: any) => CommentSlctnActions.replace(p.comment, r)),
				// First add files
				startWith(CommentSlctnActions.add([p.comment]) as any)
			))
		);

	constructor(private actions$: Actions, private srv: CommentService, private selectionSrv: SelectionService) {}
}

import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { ActionType } from '../../action/selection/file-selection.action';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { VoteSlctnActions } from '../../action/selection/vote-selection.action';
import { CommentSlctnActions } from '../../action/selection/comment-selection.action';

@Injectable()
export class VoteEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		withLatestFrom( this.selectionSrv.getSelection(), (_, target ) => target),
		switchMap(target => this.srv.load(target)),
		map((r: any) => VoteSlctnActions.add(r))
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

	constructor(private actions$: Actions, private srv: VoteService, private selectionSrv: SelectionService) {}

}

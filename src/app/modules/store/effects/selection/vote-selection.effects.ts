import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { VoteService } from '../../services/vote.service';
import { ActionType } from '../../action/selection/file-selection.action';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { VoteSlctnActions } from '../../action/selection/vote-selection.action';
import { CommentSlctnActions } from '../../action/selection/comment-selection.action';

@Injectable()
export class VoteSelectionEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.load(target)),
		map((r: any) => VoteSlctnActions.set(r))
	);

	@Effect({ dispatch: false })
	createForSelection$ = this.actions$.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (vote, target ) => ({ vote, target })),
			switchMap((p: any) => this.srv.create(p))
		);

	constructor(private actions$: Actions, private srv: VoteService, private selectionSrv: SelectionService) {}

}

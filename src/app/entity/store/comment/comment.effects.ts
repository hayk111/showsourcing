import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { Swap } from '~entity/utils';
import { appErrorActions } from '~shared/error-handler/app-errors.action';

import { FocussedEntityService } from '../focussed-entity';
import { CommentHttpService } from './comment-http.service';
import { commentActions, commentActionType as actionType } from './comment.action';

@Injectable()
export class CommentEffects {
	// loads comment for current selection
	@Effect()
	load$ = this.actions$
		.ofType<any>(actionType.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.focusSrv.getSelection()),
			switchMap(target => this.srv.load(target)),
			map((r: any) => commentActions.set(r))
		);

	// effect that add a comment to the target (will also add to backend)
	@Effect()
	create$ = this.actions$.ofType<any>(actionType.CREATE).pipe(
		map(action => action.payload),
		withLatestFrom(this.focusSrv.getSelection(), (comment, target) => ({ comment, target })),
		switchMap((p: any) =>
			this.srv.create(p).pipe(
				// replace currently pending comment, we need to replace so it's not pending anymore
				map((r: any) => commentActions.replace([new Swap(p.comment, r)])),
				catchError(e => of(appErrorActions.add(e)))
			)
		)
	);

	constructor(private actions$: Actions, private srv: CommentHttpService, private focusSrv: FocussedEntityService) { }
}

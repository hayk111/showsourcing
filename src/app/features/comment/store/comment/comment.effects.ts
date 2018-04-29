import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { catchError, map, switchMap, withLatestFrom, tap, distinctUntilChanged } from 'rxjs/operators';
import { appErrorActions } from '~shared/error-handler/app-errors.action';

import { CommentHttpService } from './comment-http.service';
import { EntityTarget } from '~app/entity';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';
import { CommentActions, AppComment, CommentActionTypes } from '~app/features/comment/store/comment';


@Injectable()
export class CommentEffects {
	// loads comment for current selection
	@Effect()
	load$ = this.actions$
		.ofType<any>(CommentActionTypes.LOAD)
		.pipe(
			// getting the target from the focus service
			map(_ => this.focusSrv.target),
			distinctUntilChanged(),
			switchMap((target: EntityTarget) => this.srv.load(target)),
			map((r: any) => CommentActions.set(r))
		);

	// effect that add a comment to the target (will also add to backend)
	@Effect()
	create$ = this.actions$.ofType<any>(CommentActionTypes.CREATE).pipe(
		map(action => action.payload),
		switchMap((comment: AppComment) =>
			this.srv.create(comment, this.focusSrv.target).pipe(
				// replace currently pending comment, we need to replace so it's not pending anymore
				map((r: any) => CommentActions.replace(r)),
				catchError(e => of(appErrorActions.add(e)))
			)
		)
	);

	constructor(private actions$: Actions, private srv: CommentHttpService, private focusSrv: FocusedEntityService) { }
}

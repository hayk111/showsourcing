import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentHttpService } from '~comment/services';
import { map, switchMap, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { SelectionService } from '~store/services/selection.service';
import { actionType, commentActions } from '~comment/store/actions';
import { of } from 'rxjs/observable/of';
import { appErrorActions } from '~shared/error-handler/app-errors.action';
import { Swap } from '~app/shared/entity';

@Injectable()
export class CommentEffects {
	// loads comments for current selection
	@Effect()
	load$ = this.actions$
		.ofType<any>(actionType.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.selectionSrv.getSelection()),
			switchMap(target => this.srv.load(target)),
			map((r: any) => commentActions.set(r))
		);

	// effect that add a comment to the target (will also add to backend)
	@Effect()
	create$ = this.actions$.ofType<any>(actionType.CREATE).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (comment, target) => ({ comment, target })),
		switchMap((p: any) =>
			this.srv.create(p).pipe(
				// replace currently pending comment, we need to replace so it's not pending anymore
				map((r: any) => commentActions.replace([new Swap(p.comment, r)])),
				catchError(e => of(appErrorActions.add(e)))
			)
		)
	);

	constructor( private actions$: Actions, private srv: CommentHttpService, private selectionSrv: SelectionService) {}
}

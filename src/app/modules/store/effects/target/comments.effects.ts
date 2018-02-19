import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentService } from '../../services/comment.service';
import { map, startWith, switchMap, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { ActionType, CommentTargetActions } from '../../action/target/comment.action';
import { FileTargetActions } from '../../action/target/file.action';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '../../action/misc/app-errors.action';



@Injectable()
export class CommentTargetEffects {

	// loads comments for current target
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.load(target)),
		map((r: any) => CommentTargetActions.set(r))
	);

	// effect that add a comment to the target (will also add to backend)
	@Effect()
	addForSelection$ = this.actions$.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (comment, target ) => ({ comment, target })),
			switchMap((p: any) => this.srv.create(p).pipe(
				// replace currently pending comment, we need to replace so it's not pending anymore
				map((r: any) => CommentTargetActions.replace(p.comment, r)),
				catchError(e => of(AppErrorActions.add(e)))
			))
		);

	constructor(private actions$: Actions, private srv: CommentService, private selectionSrv: SelectionService) {}
}

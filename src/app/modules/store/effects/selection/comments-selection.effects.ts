import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { CommentService } from '../../services/comment.service';
import { map, startWith, switchMap, withLatestFrom, tap, catchError } from 'rxjs/operators';
import { SelectionService } from '../../services/selection.service';
import { ActionType, CommentSlctnActions } from '../../action/selection/comment-selection.action';
import { FileSlctnActions } from '../../action/selection/file-selection.action';
import { of } from 'rxjs/observable/of';
import { AppErrorActions } from '../../action/misc/app-errors.action';



@Injectable()
export class CommentSelectionEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.load(target)),
		map((r: any) => CommentSlctnActions.set(r))
	);

	@Effect()
	addForSelection$ = this.actions$.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (comment, target ) => ({ comment, target })),
			switchMap((p: any) => this.srv.create(p).pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				map((r: any) => CommentSlctnActions.replace(p.comment, r)),
				catchError(e => of(AppErrorActions.add(e)))
			))
		);

	constructor(private actions$: Actions, private srv: CommentService, private selectionSrv: SelectionService) {}
}

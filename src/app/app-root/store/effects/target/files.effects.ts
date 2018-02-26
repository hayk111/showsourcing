import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FileService } from '../../services/file.service';
import { SelectionService } from '../../services/selection.service';
import { ActionType, FileTargetActions } from '../../action/target/file.action';
import { mergeMap } from 'rxjs/operators';
import { FeedbackDlgActions, FeedbackStyle } from '../../action/ui/feedback-dlg.action';
import { catchError } from 'rxjs/operators/catchError';
import { AppErrorActions } from '../../action/misc/app-errors.action';
import { of } from 'rxjs/observable/of';

@Injectable()
export class FilesTargetEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.load(target)),
		map((r: any) => FileTargetActions.set(r))
	);

	// 1. Add file with ref
	// 2. post the file
	// 3. When the posted file is done, replace here will be called
	@Effect()
	add$ = this.actions$.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
			switchMap((p: any) => this.srv.uploadFile(p).pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				mergeMap((r: any) => [
					FeedbackDlgActions.add({ styleType: FeedbackStyle.SUCCESS, title: 'File Uploaded', body: 'Your file was uploaded with success'}),
					FileTargetActions.replace(p.file, r)
				]),
				catchError(e => of(AppErrorActions.add(e)))
			))
		);

	@Effect({ dispatch: false })
	removeFile$ = this.actions$.ofType<any>(ActionType.REMOVE).pipe(
		map(action => action.payload),
		withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
		switchMap(p => this.srv.delete(p))
	);


	@Effect({ dispatch: false })
	download$ = this.actions$.ofType<any>(ActionType.DOWNLOAD).pipe(
		map(action => action.payload),
		tap( img => this.srv.download(img))
	);

	constructor(private actions$: Actions, private srv: FileService, private selectionSrv: SelectionService) {}

}


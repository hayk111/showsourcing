import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { FileService } from '../services';
import { SelectionService } from '~store/services/selection.service';
import { FileActionType, FileActions } from './file.action';
import { mergeMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';
import { AppFile } from '../models';
import { Swap } from '~app/shared/entity/utils';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { NotificationType } from '~app/shared/notifications';
import { appErrorActions } from '~app/shared/error-handler';

@Injectable()
export class FilesEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(FileActionType.LOAD).pipe(
		// getting the target
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap(target => this.srv.load(target)),
		map((r: any) => FileActions.set(r))
	);

	// 1. Add file with ref
	// 2. post the file
	// 3. When the posted file is done, replace here will be called
	@Effect()
	add$ = this.actions$.ofType<any>(FileActionType.ADD).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (files: Array<AppFile>, target) => ({
			files,
			target,
		})),
		switchMap(p =>
			this.srv.uploadFiles(p).pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				mergeMap((r: Array<Swap>) => [
					notificationActions.add({
						type: NotificationType.SUCCESS,
						title: 'File Uploaded',
						message: 'Your file was uploaded with success',
					}),
					// we also replace the current pending files
					FileActions.replace(r),
				]),
				catchError(e => of(appErrorActions.add(e)))
			)
		)
	);

	@Effect({ dispatch: false })
	removeFile$ = this.actions$.ofType<any>(FileActionType.DELETE).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (ids, target) => ({
			ids,
			target,
		})),
		switchMap(p => this.srv.delete(p))
	);

	@Effect({ dispatch: false })
	download$ = this.actions$
		.ofType<any>(FileActionType.DOWNLOAD)
		.pipe(map(action => action.payload), tap(img => this.srv.download(img)));

	constructor(private actions$: Actions, private srv: FileService, private selectionSrv: SelectionService) {}
}

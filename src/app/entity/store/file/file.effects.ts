import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { of ,  forkJoin } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom ,  catchError } from 'rxjs/operators';
import { AppFile } from './file.model';

import { FileHttpService } from '~app/entity/store/file/file-http.service';
import { appErrorActions } from '~app/shared/error-handler';
import { NotificationType } from '~app/shared/notifications';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { EntityTarget } from '~app/entity/store/entity.model';

import { fromFile } from './file.bundle';
import { FocusedEntityService } from '~app/shared/focused-entity/focused-entity.service';


const ActionType = fromFile.ActionTypes;
const fileActions = fromFile.Actions;

@Injectable()
export class FilesEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD_FOR_SELECTION).pipe(
		// getting the target
		map(_ => this.focusSrv.target),
		switchMap((target: EntityTarget) => this.srv.load(target)),
		map((r: any) => fileActions.set(r))
	);


	@Effect({ dispatch: false })
	removeFile$ = this.actions$.ofType<any>(ActionType.DELETE).pipe(
		map(action => action.payload),
		switchMap((ids: Array<string>) => this.srv.delete(ids, this.focusSrv.target))
	);


	@Effect({ dispatch: false })
	download$ = this.actions$
		.ofType<any>(ActionType.DOWNLOAD)
		.pipe(map(action => action.payload), tap(img => this.srv.download(img)));

	// 1. Add file with ref
	// 2. post the file
	// 3. When the posted file is done, replace here will be called
	@Effect()
	add$ = this.actions$.ofType<any>(ActionType.ADD).pipe(
		map(action => action.payload),
		mergeMap((files) => files.map(file => fileActions.addOne(file)))
	);

	@Effect()
	addOne$ = this.actions$.ofType<any>(ActionType.ADD_ONE).pipe(
		map(action => ({ file: action.payload, target: this.focusSrv.target })),
		mergeMap((p: any) => this.srv.uploadFile(p.file).pipe(
			// replace currently pending files, we need to replace so it's not pending anymore
			mergeMap((newFile) => [
				notificationActions.add({
					type: NotificationType.SUCCESS,
					title: 'File Uploaded',
					message: 'Your file was uploaded with success',
				}),
				fileActions.link(p.target, newFile),
				// we also replace the current pending files
				fileActions.replace([newFile]),
			]),
			catchError(e => of(appErrorActions.add(e)))
		))
	);

	@Effect({ dispatch: false })
	link$ = this.actions$.ofType<any>(ActionType.LINK).pipe(
		map(action => action.payload),
		mergeMap((p: any) => this.srv.linkToItem(p.target, p.file))
	);


	constructor(private actions$: Actions, private srv: FileHttpService, private focusSrv: FocusedEntityService) { }
}

import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FileActions, ActionType } from '../action/file.action';
import { map, switchMap, tap, exhaustMap, mergeMap } from 'rxjs/operators';
import { EntityTarget } from '../utils/entities.utils';
import { AppFile } from '../model/app-file.model';
import { FileService } from '../services/file.service';


@Injectable()
export class FilesEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((target: EntityTarget) => this.srv.load(target, 'attachment')),
		map((files: Array<AppFile>) => FileActions.add(files))
	);

	// 1. Add new file
	@Effect()
	addAttachments$ = this.actions$.ofType<any>(ActionType.ADD_NEW)
		.pipe(
			map(action => action.payload),
			map((file: AppFile) => FileActions.addPending(file))
		);

	// 2. upload image
	// 3. when uploaded set pending image to ready
	@Effect()
	pendingFile$ = this.actions$.ofType<any>(ActionType.ADD_PENDING).pipe(
		map(action => action.payload),
		mergeMap(
			(pendingFile: AppFile) => this.srv.uploadFile(pendingFile, 'attachment'),
			(pendingFile: AppFile, returnedFile: AppFile) => FileActions.setReady(pendingFile.id, returnedFile)
		),
	);

	@Effect({ dispatch: false })
	removeFile$ = this.actions$.ofType<any>(ActionType.REMOVE).pipe(
		map(action => action.payload),
		switchMap(file => this.srv.delete(file))
	);


	@Effect({ dispatch: false })
	download$ = this.actions$.ofType<any>(ActionType.DOWNLOAD).pipe(
		map(action => action.payload),
		tap( img => this.srv.download(img))
	);


	constructor(private actions$: Actions, private srv: FileService) {}


}


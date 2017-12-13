import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FileActions, ActionType } from '../action/app-file.action';
import { FileService } from '../../shared/entities-services/file.service';
import { map, switchMap } from 'rxjs/operators';
import { EntityTarget } from '../utils/entities.utils';
import { AppFile } from '../model/app-file.model';


@Injectable()
export class FilesEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((target: EntityTarget) => this.srv.load(target)),
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
		switchMap((pendingFile: AppFile) => this.srv.uploadFile(pendingFile)),
		map((pendingFile: AppFile) => FileActions.setReady(pendingFile.id))
	);


	constructor(private actions$: Actions, private srv: FileService) {}


}


import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, exhaustMap, mergeMap } from 'rxjs/operators';
import { EntityTarget } from '../utils/entities.utils';
import { AppFile } from '../model/app-file.model';
import { FileService } from '../services/file.service';
import { ActionType, ImageActions } from '../action/images.action';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { ImageService } from '../services/images.service';
import { AppImage } from '../model/app-image.model';

@Injectable()
export class ImageEffects {

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((target: EntityTarget) => this.srv.load(target, 'image')),
		map((files: Array<AppFile>) => ImageActions.add(files))
	);

	// 1. Add new image
	@Effect()
	addImage$ = this.actions$.ofType<any>(ActionType.ADD_NEW)
		.pipe(
			map(action => action.payload),
			map((file: AppFile) => ImageActions.addPending(file))
		);

	// 2. upload image
	// 3. when uploaded set pending image to ready
	@Effect()
	pendingImage$ = this.actions$.ofType<any>(ActionType.ADD_PENDING).pipe(
		map(action => action.payload),
		mergeMap(
			(pendingFile: AppFile) => this.srv.uploadFile(pendingFile, 'image'),
			(pendingFile: AppFile, returnedFile: AppFile) => ImageActions.setReady(pendingFile.id, returnedFile)
		)
	);

	@Effect()
	rotate$ = this.actions$.ofType<any>(ActionType.ROTATE).pipe(
		map(action => action.payload),
		switchMap((img) => this.srv.rotate(img) ),
		switchMap((img) => this.srv.preload(img)),
		map((r: AppImage) => ImageActions.setImage(r))
	);

	@Effect({ dispatch: false })
	download$ = this.actions$.ofType<any>(ActionType.DOWNLOAD).pipe(
		map(action => action.payload),
		tap( img => this.srv.download(img))
	);

	@Effect({ dispatch: false })
	delete$ = this.actions$.ofType<any>(ActionType.DELETE).pipe(
		map(action => action.payload),
		switchMap(img => this.srv.delete(img))
	);


	constructor(private actions$: Actions, private srv: ImageService) {}

}

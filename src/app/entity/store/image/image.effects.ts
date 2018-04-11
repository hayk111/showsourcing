import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, switchMap, tap, withLatestFrom, mergeMap, catchError } from 'rxjs/operators';
import { ImageHttpService } from '~app/entity/store/image/image-http.service';
import { Swap } from '~entity/utils';

import { EntityTarget } from '../entity.model';
import { FocussedEntityService } from '../focussed-entity/focussed-entity.service';
import { AppImage } from './image.model';
import { fromImage } from './image.bundle';
import { imageActionTypes } from '~app/entity/store/image/image.action';
import { notificationActions } from '~app/shared/notifications/store/notification.action';
import { NotificationType } from '~app/shared/notifications';
import { appErrorActions } from '~app/shared/error-handler';
import { of } from 'rxjs/observable/of';


@Injectable()
export class ImageEffects {
	constructor(private actions$: Actions, private srv: ImageHttpService, private selectionSrv: FocussedEntityService) { }

	@Effect()
	load$ = this.actions$
		.ofType<any>(imageActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.selectionSrv.getSelection()),
			switchMap((target: EntityTarget) => this.srv.load(target)),
			map((files: Array<AppImage>) => fromImage.Actions.set(files))
		);


	@Effect()
	add$ = this.actions$.ofType<any>(imageActionTypes.ADD).pipe(
		map(action => action.payload),
		mergeMap((files) => files.map(file => fromImage.Actions.addOne(file)))
	);

	@Effect()
	addOne$ = this.actions$.ofType<any>(imageActionTypes.ADD_ONE).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (file, target) => ({
			file,
			target,
		})),
		mergeMap((p: any) => this.srv.uploadFile(p.file).pipe(
			// replace currently pending files, we need to replace so it's not pending anymore
			mergeMap((newFile: AppImage) => [
				notificationActions.add({
					type: NotificationType.SUCCESS,
					title: 'File Uploaded',
					message: 'Your file was uploaded with success',
				}),
				fromImage.Actions.link(p.target, newFile),
				// we also replace the current pending files
				fromImage.Actions.replace([new Swap(p.file, newFile)]),
			]),
			catchError(e => of(appErrorActions.add(e)))
		))
	);

	@Effect({ dispatch: false })
	link$ = this.actions$.ofType<any>(imageActionTypes.LINK).pipe(
		map(action => action.payload),
		mergeMap((p: any) => this.srv.linkToItem(p.target, p.file, 'image'))
	);

	@Effect()
	rotate$ = this.actions$
		.ofType<any>(imageActionTypes.ROTATE)
		.pipe(
			map(action => action.payload),
			switchMap(
				img => this.srv.rotate(img),
				(old: AppImage, replacing: AppImage) => fromImage.Actions.replace([new Swap(old, replacing)])
			)
		);

	@Effect({ dispatch: false })
	download$ = this.actions$
		.ofType<any>(imageActionTypes.DOWNLOAD)
		.pipe(map(action => action.payload), tap(img => this.srv.download(img)));

	@Effect({ dispatch: false })
	delete$ = this.actions$
		.ofType<any>(imageActionTypes.DELETE)
		.pipe(
			map(action => action.payload),
			withLatestFrom(this.selectionSrv.getSelection(), (ids, target) => ({ ids, target })),
			switchMap(p => this.srv.delete(p))
		);
}

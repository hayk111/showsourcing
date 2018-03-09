import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom, retry, catchError } from 'rxjs/operators';
import { EntityTarget } from '~entity';
import { ImageService } from '../services';
import { AppImage } from '../models';
import { SelectionService } from '~store/services/selection.service';
import { ImageActionType, ImageActions } from './images.action';
import { AppErrorActions } from '~store/action/misc/app-errors.action';
import { of } from 'rxjs/observable/of';
import { Swap } from '~app/shared/entity/utils';

@Injectable()
export class ImageEffects {
	constructor(
		private actions$: Actions,
		private srv: ImageService,
		private selectionSrv: SelectionService
	) {}

	@Effect()
	load$ = this.actions$
		.ofType<any>(ImageActionType.LOAD)
		.pipe(
			switchMap(_ => this.selectionSrv.getSelection()),
			switchMap((target: EntityTarget) => this.srv.load(target)),
			map((files: Array<AppImage>) => ImageActions.set(files))
		);

	@Effect()
	add$ = this.actions$.ofType<any>(ImageActionType.ADD).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (files, target) => ({ files, target })),
		switchMap((p: any) =>
			this.srv.uploadFiles(p).pipe(
				map((swaps: Array<Swap>) => ImageActions.replace(swaps))
				// we can't catch error because there will be errors..
				// catchError(e => of(AppErrorActions.add(e)))
			)
		)
	);

	@Effect()
	rotate$ = this.actions$
		.ofType<any>(ImageActionType.ROTATE)
		.pipe(
			map(action => action.payload),
			switchMap(
				img => this.srv.rotate(img),
				(old: AppImage, replacing: AppImage) => ImageActions.replace([new Swap(old, replacing)])
			)
		);

	@Effect({ dispatch: false })
	download$ = this.actions$
		.ofType<any>(ImageActionType.DOWNLOAD)
		.pipe(map(action => action.payload), tap(img => this.srv.download(img)));

	@Effect({ dispatch: false })
	delete$ = this.actions$
		.ofType<any>(ImageActionType.DELETE)
		.pipe(
			map(action => action.payload),
			withLatestFrom(this.selectionSrv.getSelection(), (ids, target) => ({ ids, target })),
			switchMap(p => this.srv.delete(p))
		);
}

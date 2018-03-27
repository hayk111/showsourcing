import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, tap, withLatestFrom, retry, catchError } from 'rxjs/operators';
import { EntityTarget, FocussedEntityService, AppImage, Swap } from '~entity';
import { imageActionTypes, imageActions } from './images.action';
import { of } from 'rxjs/observable/of';
import { ImageHttpService } from '~app/entity/store/image/images-http.service';

@Injectable()
export class ImageEffects {
	constructor(private actions$: Actions, private srv: ImageHttpService, private selectionSrv: FocussedEntityService) { }

	@Effect()
	load$ = this.actions$
		.ofType<any>(imageActionTypes.LOAD_FOR_SELECTION)
		.pipe(
			switchMap(_ => this.selectionSrv.getSelection()),
			switchMap((target: EntityTarget) => this.srv.load(target)),
			map((files: Array<AppImage>) => imageActions.set(files))
		);

	@Effect()
	add$ = this.actions$.ofType<any>(imageActionTypes.ADD).pipe(
		map(action => action.payload),
		withLatestFrom(this.selectionSrv.getSelection(), (files, target) => ({ files, target })),
		switchMap((p: any) =>
			this.srv.uploadFiles(p).pipe(
				map((swaps: Array<Swap>) => imageActions.replace(swaps))
				// we can't catch error because there will be errors..
				// catchError(e => of(AppErrorActions.add(e)))
			)
		)
	);

	@Effect()
	rotate$ = this.actions$
		.ofType<any>(imageActionTypes.ROTATE)
		.pipe(
			map(action => action.payload),
			switchMap(
				img => this.srv.rotate(img),
				(old: AppImage, replacing: AppImage) => imageActions.replace([new Swap(old, replacing)])
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

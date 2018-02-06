import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, startWith, switchMap, tap, withLatestFrom, retry } from 'rxjs/operators';
import { EntityTarget } from '../../utils/entities.utils';
import { ImageService } from '../../services/images.service';
import { AppImage } from '../../model/entities/app-image.model';
import { SelectionService } from '../../services/selection.service';
import { ActionType, ImageSlctnActions } from '../../action/selection/images-selection.action';

@Injectable()
export class ImageSelectionEffects {

	constructor(private actions$: Actions, private srv: ImageService, private selectionSrv: SelectionService) {}

	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		switchMap(_ => this.selectionSrv.getSelection()),
		switchMap((target: EntityTarget) => this.srv.load(target)),
		map((files: Array<AppImage>) => ImageSlctnActions.set(files))
	);

	@Effect()
	addForSelection$ = this.actions$.ofType<any>(ActionType.ADD)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
			switchMap((p: any) => this.srv.uploadFile(p).pipe(
				// the file might not be ready yet so we have to query it until it's ready.
				switchMap(
				(r: any) => this.srv.queryFile(r).pipe(retry(10)),
				// replace currently pending files
				map((r: any) => ImageSlctnActions.replace(p.file, r))
			))
		));

	@Effect()
	rotate$ = this.actions$.ofType<any>(ActionType.ROTATE).pipe(
		map(action => action.payload),
		switchMap(
			(img) => this.srv.rotate(img),
			(old: AppImage, replacing: AppImage) => ImageSlctnActions.replace(old, replacing)
		),
	);

	@Effect({ dispatch: false })
	download$ = this.actions$.ofType<any>(ActionType.DOWNLOAD).pipe(
		map(action => action.payload),
		tap( img => this.srv.download(img))
	);

	@Effect({ dispatch: false })
	delete$ = this.actions$.ofType<any>(ActionType.REMOVE).pipe(
		map(action => action.payload),
		withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
		switchMap(p => this.srv.delete(p))
	);

}

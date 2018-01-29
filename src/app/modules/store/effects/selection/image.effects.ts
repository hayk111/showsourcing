import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
		switchMap((target: EntityTarget) => this.srv.load(target, 'image')),
		map((files: Array<AppImage>) => ImageSlctnActions.add(files))
	);

	@Effect()
	createForSelection$ = this.actions$.ofType<any>(ActionType.CREATE)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
			switchMap((p: any) => this.srv.uploadFile(p, 'image').pipe(
				// replace currently pending files, we need to replace so it's not pending anymore
				map(r => ImageSlctnActions.replace(p.file, r)),
				// First add files
				startWith(ImageSlctnActions.add([p.file]) as any)
			))
		);

	@Effect({ dispatch: false })
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
		switchMap(p => this.srv.delete(p, 'image'))
	);

}

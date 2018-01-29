import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FileActions, ActionType } from '../../action/entities/file.action';
import { map, switchMap, tap, mergeMap, withLatestFrom, startWith } from 'rxjs/operators';
import { entityRepresentationMap } from '../../utils/entities.utils';
import { AppFile } from '../../model/entities/app-file.model';
import { FileService } from '../../services/file.service';
import { SelectionService } from '../../services/selection.service';
import { FileSlctnActions } from '../../action/selection/file-selection.action';

@Injectable()
export class FilesEffects {


	// 1. Add file with ref
	// 2. post the file
	// 3. When the posted file is done, replace here will be called
	@Effect()
	createForSelection$ = this.actions$.ofType<any>(ActionType.CREATE_FOR_SELECTION)
		.pipe(
			map(action => action.payload),
			withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
			switchMap((p: any) => this.srv.uploadFile(p).pipe(
			  // replace currently pending files, we need to replace so it's not pending anymore
				map(r => FileSlctnActions.replace(p.file, r)),
				// First add files
				startWith(FileSlctnActions.add([p.file]) as any)
			))
		);



	@Effect({ dispatch: false })
	removeFile$ = this.actions$.ofType<any>(ActionType.REMOVE).pipe(
		map(action => action.payload),
		withLatestFrom( this.selectionSrv.getSelection(), (file, target ) => ({ file, target })),
		switchMap(p => this.srv.delete(p))
	);


	@Effect({ dispatch: false })
	download$ = this.actions$.ofType<any>(ActionType.DOWNLOAD).pipe(
		map(action => action.payload),
		tap( img => this.srv.download(img))
	);

	constructor(private actions$: Actions, private srv: FileService, private selectionSrv: SelectionService) {}

}


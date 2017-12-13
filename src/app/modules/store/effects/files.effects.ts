import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FileActions, ActionType } from '../action/app-file.action';
import { FileService } from '../../shared/entities-services/file.service';
import { map, switchMap } from 'rxjs/operators';
import { EntityTarget } from '../utils/entities.utils';


@Injectable()
export class FilesEffects {
	@Effect()
	load$ = this.actions$.ofType<any>(ActionType.LOAD).pipe(
		map(action => action.payload),
		switchMap((target: EntityTarget) => this.srv.load(target)),
		map((arr: any[]) => {
			debugger;
			return FileActions.add(arr);
		})
	);


	constructor(private actions$: Actions, private srv: FileService) {}


}


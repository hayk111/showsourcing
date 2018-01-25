import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { TypedAction } from '../../utils/typed-action.interface';
import { AppError } from '../../model/misc/app-error.model';
import { SnackBarAction } from '../../action/ui/snackbar.action';
import { ActionType } from '../../action/misc/app-errors.action';


@Injectable()
export class AppErrorsEffects {

	// // Listen for the patch action
	@Effect()
	add: Observable<any> = this.actions$.ofType(ActionType.ADD_ERROR)
		.do(x => console.log(x))
		.map((action: TypedAction<AppError>) => action.payload)
		.map((error: AppError) => SnackBarAction.add(error.message));

	constructor(private actions$: Actions) {}

}


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ActionType } from '../action/snackbar.action';


@Injectable()
export class SnackBarEffects {

	// // Listen for the patch action
	@Effect({dispatch: false})
	add$: Observable<Action> = this.actions$.ofType(ActionType.ADD)
		.map((action: TypedAction<any>) => action.payload)
		.do(p => {
			const snackRef = this.snackBar.open(p.message, undefined, p.config);
		});

	constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

}

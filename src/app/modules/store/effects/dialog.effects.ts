import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionType } from '../action/dialog.action';
import { MatDialog } from '@angular/material';
import { TypedAction } from '../utils/typed-action.interface';



@Injectable()
export class DialogEffects {
	@Effect({dispatch: false})
	open$: Observable<any> = this.actions$.ofType(ActionType.OPEN)
	.map((action: TypedAction<any>) => action.payload)
	.do(p => {
		debugger;
		this.dialog.open(p.component);
	});

	constructor(private actions$: Actions, private dialog: MatDialog) {}
}

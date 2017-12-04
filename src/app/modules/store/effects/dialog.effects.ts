import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActionType } from '../action/dialog.action';
import { MatDialog } from '@angular/material';
import { TypedAction } from '../utils/typed-action.interface';
import { ProductActions } from '../action/product.action';



@Injectable()
export class DialogEffects {
	// @Effect({dispatch: false})
	// open$: Observable<any> = this.actions$.ofType(ActionType.OPEN)
	// .map((action: TypedAction<any>) => action.payload)
	// .do(p => this.dialog.open(p.component));

	@Effect({dispatch: false})
	open$: Observable<any> = this.actions$.ofType(ActionType.OPEN)
	.map((action: TypedAction<any>) => action.payload)
	.filter(p => p.metadata.id)
	.map( p => ProductActions);

	constructor(private actions$: Actions, private dialog: MatDialog) {}
}

import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';


@Injectable()
export class FilterEffects {

	@Effect()
	addFilter$ = this.actions$.ofType<any>()

	constructor(private actions$: Actions) {}

}

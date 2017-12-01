import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ActionType } from '../action/product.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class ProductEffects {

	// // Listen for the patch action
	@Effect({ dispatch: false })
	patch$: Observable<any> = this.actions$.ofType(ActionType.PATCH_PROPERTY)
		.map((action: TypedAction<any>) => action.payload)
		.pipe(
			switchMap(p => this.sendPatchRequest(p))
		);

	constructor(private http: HttpClient, private actions$: Actions) {}

	sendPatchRequest(payload) {
		return this.http.patch(`api/product/${payload.id}`, { [payload.propName]: payload.value});
	}
}

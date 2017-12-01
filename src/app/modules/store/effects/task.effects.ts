import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionType } from '../action/task.action';
import { TypedAction } from '../utils/typed-action.interface';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';






@Injectable()
export class TaskEffects {
	// // Listen for the patch action
	@Effect({ dispatch: false })
	patch$: Observable<any> = this.actions$.ofType(ActionType.PATCH_PROPERTY)
		.map((action: TypedAction<any>) => action.payload)
		.pipe(
			switchMap(p => this.sendPatchRequest(p))
		);

	constructor(private http: HttpClient, private actions$: Actions) {}

	sendPatchRequest(payload) {
		return this.http.patch(`api/task/${payload.id}`, { [payload.propName]: payload.value});
	}
}

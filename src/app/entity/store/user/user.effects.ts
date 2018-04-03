import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ActionType, UserActions } from './user.action';
import { UserHttpService } from './user.http.service';

@Injectable()
export class UserEffects {
	@Effect({ dispatch: false })
	patch$ = this.actions$.ofType<any>(ActionType.PATCH).pipe(
		map(action => action.payload),
		switchMap(patch => this.srv.patch(patch))
	);

	// @Effect()
	// uploadImage$ = this.actions$.ofType<any>(ActionType.UPLOAD_IMG)

	constructor(
		private actions$: Actions,
		private srv: UserHttpService
	) { }
}

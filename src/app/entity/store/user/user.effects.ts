import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ActionType, UserActions } from './user.action';
import { UserHttpService } from './user.http.service';

@Injectable()
export class UserEffects {
	@Effect()
	load$ = this.actions$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map(UserActions.setUser));

	constructor(
		private actions$: Actions,
		private srv: UserHttpService,
		private store: Store<any>,
		private http: HttpClient
	) { }
}

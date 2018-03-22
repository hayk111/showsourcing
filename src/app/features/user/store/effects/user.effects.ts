import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '~user/services';
import { ActionType, UserActions } from '~user/store/actions';

@Injectable()
export class UserEffects {
	@Effect()
	load$ = this.actions$
		.ofType<any>(ActionType.LOAD)
		.pipe(switchMap(_ => this.srv.load()), map(UserActions.setUser));

	constructor(
		private actions$: Actions,
		private srv: UserService,
		private store: Store<any>,
		private http: HttpClient
	) {}
}

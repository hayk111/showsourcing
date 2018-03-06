import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { TokenActionType, AuthActions } from '../actions';
import { map, tap, filter } from 'rxjs/operators';
import { TokenService } from '~auth/services';

@Injectable()
export class TokenEffects {
	@Effect({ dispatch: false })
	set$ = this.actions$
		.ofType<any>(TokenActionType.SET)
		.pipe(map(action => action.payload), tap(token => (this.srv.token = token)));

	@Effect()
	checkValid$ = this.actions$
		.ofType<any>(TokenActionType.CHECK)
		.pipe(filter(_ => this.srv.checkAuthToken()), map(_ => AuthActions.authenticate(this.srv.token, false)));

	@Effect()
	checkInvalid$ = this.actions$
		.ofType<any>(TokenActionType.CHECK)
		.pipe(filter(_ => !this.srv.checkAuthToken()), map(_ => AuthActions.logout()));

	@Effect({ dispatch: false })
	remove$ = this.actions$.ofType<any>(TokenActionType.REMOVE).pipe(tap(_ => this.srv.removeToken()));

	constructor(private actions$: Actions, private srv: TokenService) {}
}

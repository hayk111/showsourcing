import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, AuthActions } from '../action/authentication.action';
import { map, switchMap, filter, tap, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../model/user.model';
import { UserActions } from '../action/user.action';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators/catchError';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { TokenActions } from '../action/token.action';
import { startWith } from 'rxjs/operators';



@Injectable()
export class AuthenticationEffects {

	@Effect()
	login$ = this.actions$.ofType<any>(ActionType.LOGIN).pipe(
		map(action => action.payload),
		debounceTime(500),
		switchMap(p => this.srv.login(p).pipe(
			map(r => this.onLoginSuccess(r)),
			catchError((e: HttpErrorResponse) => this.onLoginError(e)),
			startWith(AuthActions.setPending(true))
		))
	);

	@Effect()
	auth$ = this.actions$.ofType<any>(ActionType.AUTHENTICATE).pipe(
		map(action => action.payload),
		tap(p => this.store.dispatch(TokenActions.setToken(p.token))),
		tap(p => this.checkRedirect(p.redirect)),
		map(payload => UserActions.load())
	);

	@Effect({ dispatch: false })
	logout$ = this.actions$.ofType<any>(ActionType.LOGOUT).pipe(
		tap(_ => this.store.dispatch(TokenActions.remove())),
		tap(_ => this.store.dispatch(UserActions.resetUser())),
		tap(_ => {
			this.router.navigate(['guest', 'login']);
		})
	);

	private onLoginSuccess(r: HttpResponse<Object>) {
		const token = r.headers.get('X-Auth-Token');
		return AuthActions.authenticate(token, true);
	}

	private onLoginError(error: { error, status }) {
		if (error.status !== 404)
			return of(AuthActions.setError(error.error));
		else
			return of(AuthActions.setError('The service seems to be momentarily down. Please try again later.'));
	}

	private checkRedirect(redirect) {
		if (redirect)
			this.router.navigate(['home']);
	}

	constructor(private actions$: Actions,
							private srv: AuthService,
							private store: Store<any>,
							private router: Router) {}
}

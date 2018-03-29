import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, map, mergeMap, startWith, switchMap, tap, filter } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';
import { UserActions } from '~user';
import { AuthHttpService, TokenService } from '~auth/services';
import { TypedAction } from '~app/app-root/utils';
import { of } from 'rxjs/observable/of';
import { LocalStorageService } from '~app/shared/local-storage';
import { AuthActionType, AuthActions } from './authentication.action';


// warning: this effect class is a bit of a cluster fuck and hard to follow. Should ultimately
// be refactored in something easier.
@Injectable()
export class AuthenticationEffects {
	private static TOKEN_NAME = 'TOKEN';
	private _token;

	@Effect()
	login$ = this.actions$
		.ofType<any>(AuthActionType.LOGIN)
		.pipe(
			map(action => action.payload),
			// debounce time to prevent unnecessary attempts
			debounceTime(700),
			switchMap(p => this.srv.login(p)),
			// we save the token for when the user refresh the page
			tap(r => this.tokenSrv.token = r.headers.get('X-Auth-Token')),
			mergeMap(r => [UserActions.setUser(r.body), AuthActions.loginSuccess(r.body)]),
			catchError((e: HttpErrorResponse) => of(AuthActions.loginError(e.error)))
		);

	@Effect({ dispatch: false })
	loginSuccess$ = this.actions$.pipe(
		ofType<any>(AuthActionType.LOGIN_SUCCESS),
		tap(redirect => this.router.navigate(['']))
	);

	@Effect()
	logout$ = this.actions$.ofType<any>(AuthActionType.LOGOUT).pipe(
		tap(_ => this.tokenSrv.removeToken()),
		tap(_ => this.router.navigate(['/guest', 'login'])),
		map(_ => UserActions.resetUser())
	);

	// checking if user is already authenticated, if not then we do a logout
	// so we can remove unecessary things
	@Effect()
	checkAuthenticated$ = this.actions$.pipe(
		ofType(AuthActionType.CHECK_ALREADY_AUTHENTICATED),
		switchMap(_ => this.srv.getUser()),
		mergeMap(user => [UserActions.setUser(user), AuthActions.checkAuthenticatedSuccess(user)]),
		catchError(e => of(AuthActions.checkAuthenticatedError(e)))
	);

	@Effect()
	resetPw$ = this.actions$
		.ofType<any>(AuthActionType.RESET_PASSWORD)
		.pipe(
			map(action => action.payload),
			switchMap(email => this.srv.resetPw(email)),
			map((r: any) => AuthActions.resetPasswordSuccess()),
			catchError((e: HttpErrorResponse) => of(AuthActions.resetPasswordError(e)))
		);

	@Effect()
	register$ = this.actions$
		.ofType<any>(AuthActionType.REGISTER)
		.pipe(
			map(action => action.payload),
			switchMap(params => this.srv.register(params)),
			tap(_ => this.router.navigate([''])),
			mergeMap(user => [UserActions.setUser(user), AuthActions.registerSuccess(user)]),
			catchError((e: HttpErrorResponse) => of(AuthActions.registerError(e.message)))
		);

	constructor(
		private actions$: Actions,
		private srv: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router,
		private route: ActivatedRoute
	) { }
}

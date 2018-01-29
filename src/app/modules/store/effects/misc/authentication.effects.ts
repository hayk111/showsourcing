import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ActionType, AuthActions } from '../../action/misc/authentication.action';
import { map, switchMap, filter, tap, debounceTime, flatMap, concat, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../../model/entities/user.model';
import { UserActions } from '../../action/entities/user.action';
import { AuthService } from '../../services/auth.service';
import { catchError } from 'rxjs/operators/catchError';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { TokenActions } from '../../action/misc/token.action';
import { startWith } from 'rxjs/operators';
import { AuthDlgActions } from '../../action/ui/auth-dlg.action';
import { AuthView } from '../../model/ui/auth-dlg.model';


@Injectable()
export class AuthenticationEffects {

	@Effect()
	login$ = this.actions$.ofType<any>(ActionType.LOGIN).pipe(
		map(action => action.payload),
		debounceTime(500),
		switchMap(p => this.srv.login(p).pipe(
			mergeMap(r => this.onLoginSuccess(r) as any),
			catchError((e: HttpErrorResponse) => this.onError(e, AuthView.LOGIN) as any),
			startWith(AuthDlgActions.setPending(AuthView.LOGIN) as any),
		)),
	);

	@Effect()
	resetPw$ = this.actions$.ofType<any>(ActionType.RESET_PASSWORD).pipe(
		map( action => action.payload),
		switchMap(email => this.srv.resetPw(email).pipe(
			mergeMap((r: any) => this.onResetPwSuccess()),
			catchError((e: HttpErrorResponse) => this.onError(e, AuthView.FORGOT_PASSWORD) as any),
			startWith(AuthDlgActions.setPending(AuthView.FORGOT_PASSWORD) as any),
		))
	);


	@Effect()
	register$ = this.actions$.ofType<any>(ActionType.REGISTER).pipe(
		map(action => action.payload),
		switchMap(params => this.srv.register(params).pipe(
			mergeMap(_ => this.onRegisterSuccess()),
			catchError((e: HttpErrorResponse) => this.onError(e, AuthView.REGISTER) as any),
			startWith(AuthDlgActions.setPending(AuthView.REGISTER) as any)
		)
	));

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
		return [ AuthActions.authenticate(token, true), AuthDlgActions.setReady(AuthView.LOGIN) ];
	}

	private onRegisterSuccess() {
		return [ AuthDlgActions.setReady(AuthView.REGISTER), AuthDlgActions.setView(AuthView.ACCOUNT_CREATED)];
	}

	private onResetPwSuccess() {
		return [ AuthDlgActions.setReady(AuthView.FORGOT_PASSWORD), AuthDlgActions.setView(AuthView.PASSWORD_RESET) ];
	}

	private onError(error: { error, status }, view: AuthView) {
		if (error.status === 400)
			return [ AuthDlgActions.setError( this.makeViewError(view), view), AuthDlgActions.setReady(view) ];
		else
			return  [
				AuthDlgActions.setError('Failed. Please try again.', view),
				AuthDlgActions.setReady(view)
			];
	}

	private makeViewError(view: AuthView) {
		switch (view) {
			case AuthView.LOGIN:
				return 'Incorrect credentials';
			case AuthView.REGISTER:
				return 'Email already taken';
			case AuthView.FORGOT_PASSWORD:
				return 'Email not found';
		}
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

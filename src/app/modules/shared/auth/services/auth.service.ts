import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Credentials } from '../utils/credentials.interface';
import { HttpResponse } from '@angular/common/http';
import Log from '../../../../utils/logger/log.class';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import { TokenService } from './token.service';
import { AuthActions } from '../../../store/action/authentication.action';
import { User } from '../../../store/model/user.model';
import { UserActions } from '../../../store/action/user.action';

// This is the authentication service. It posts to api/auth to authenticate the user when the user uses the login form.
// if the credentials are correct we receive the user. In the header of the response is a
// JWT.
//
// When the application starts, we need to know if the user is still authenticated from a previous session.
// To know how that happens please read the README of this module.

@Injectable()
export class AuthService {

	constructor(private router: Router,
							private http: HttpClient,
							private store: Store<any>,
							private tokenSrv: TokenService) {

		Log.debug('Auth Service Created');
		this.checkIfPreviouslyAuthenticated();
	}

	// if we previously authenticated the token is present in the local storage.
	// then we request the api/user. The http request is gonna be automatically
	// populated with the token thank to the token-interceptor.service
	private checkIfPreviouslyAuthenticated() {
		if (this.tokenSrv.token) {
			// if there is a token we need to check with the server if the user is authenticated
			// however there is no need to do so if the token is already expired
			const exp = this.checkExpirity(this.tokenSrv.token);
			Log.debug(`AuthService: token found expired ? ${exp}`);
			if (!exp) {
				Log.debug(`Requesting user info from the server with jwt`);
				this.http.get('api/user')
					.subscribe(user => this.autoAuthSuccess(user), e => this.autoAuthError());
			}
		}else {
			// if there is no token then the user is not authenticated
			this.store.dispatch(AuthActions.setAuthenticated(false));
		}
	}

	login(credentials: Credentials) {
		this.store.dispatch(AuthActions.setPending(true));
		this.http
			.post('api/auth', credentials, { observe: 'response' })
			.subscribe(r => this.onLoginSuccess(r), error => this.onLoginError(error));
	}

	register(credentials: {email: string, password: string}) {
		this.store.dispatch(AuthActions.setPending(true));
		Observable
			.interval(4000)
			.take(1)
			.subscribe(i => {
				this.store.dispatch(AuthActions.setAuthenticated(true));
				this.router.navigate(['account-created']);
			});
	}

	private onLoginSuccess(r: HttpResponse<Object>) {
		const user = r.body as User;
		const token = r.headers.get('X-Auth-Token');
		this.tokenSrv.token = token;
		this.store.dispatch(UserActions.setUser(user));
		this.store.dispatch(AuthActions.setAuthenticated(true));
		this.goHome();
	}

	private onLoginError(error: { error, status }) {
		if (error.status !== 404)
			this.store.dispatch(AuthActions.setError(error.error));
		else
			this.store.dispatch(AuthActions.setError('The service seems to be momentarily down. Please try again later.'));
	}

	private autoAuthSuccess(user: any) {
		this.store.dispatch(UserActions.setUser(user));
		this.store.dispatch(AuthActions.setAuthenticated(true));
	}

	private autoAuthError() {
		this.store.dispatch(AuthActions.setAuthenticated(false));
	}

	private checkExpirity(tokenStr: string) {
		const token = this.tokenSrv.parseJwt(tokenStr);
		if (token && token.exp) {
			const timeTillExp = (token.exp * 1000) - Date.now() ;
			if (timeTillExp < 0) {
				this.expireToken();
				return true;
			}
			setTimeout(() => this.expireToken(), timeTillExp);
			return false;
		}
		return true;
	}

	private expireToken() {
		this.store.dispatch(AuthActions.setAuthenticated(false));
		this.tokenSrv.removeToken();
	}

	logout() {
		this.store.dispatch(AuthActions.setAuthenticated(false));
		this.store.dispatch(UserActions.resetUser());
		this.tokenSrv.removeToken();
		this.router.navigate(['guest', 'login']);
	}

	private goHome() {
		this.router.navigate(['home']);
	}

}

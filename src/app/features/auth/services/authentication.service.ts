import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, catchError, map, switchMap, filter } from 'rxjs/operators';
import { Credentials, AccessTokenState } from '~features/auth/interfaces';
import { UserService } from '~features/user';
import { AuthHttpService } from './auth-http.service';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState } from '../interfaces';

@Injectable()
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authState$ = new BehaviorSubject<AuthState>({ pending: true });
	authState$ = this._authState$.asObservable();

	constructor(
		private authHttp: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router,
	) {

		// when there is an access token that means we are authenticated
		this.tokenSrv.accessToken$.pipe(
			filter(tokenState => !tokenState.pending),
			map(tokenState => this.tokenStateToAuthState(tokenState))
		).subscribe(this._authState$);
	}

	init() {
		// since we subscribe to the access token in the constructor this will have as a side effect
		// of telling if the user is connected or not.
		this.tokenSrv.restoreAccessToken();
	}


	login(credentials: Credentials) {
		return this.authHttp.login(credentials).pipe(
			// we receive a refresh token as a response we will pass it to the token service so it generates an access token
			switchMap(refreshToken => this.tokenSrv.generateAccessToken(refreshToken)),
			tap(_ => this.router.navigate(['']))
		);
	}


	logout() {
		this.tokenSrv.clearTokens();
		this.router.navigate(['/guest', 'login']);
	}

	resetPw(email: string) {
		throw Error('not implemented yet');
	}

	register(creds: { email: string, password: string, firstName: string, lastName: string }) {
		return this.authHttp.register(creds).pipe(
			// we receive a refresh token as a response we will pass it to the token service so it generates an access token
			map(_ => ({ identifier: creds.email, password: creds.password })),
			switchMap(loginCreds => this.login(loginCreds))
		);
	}

	private tokenStateToAuthState(tokenState: AccessTokenState) {
		return {
			pending: false,
			authenticated: !!tokenState.token,
			tokenState: tokenState,
			// for easy access
			userId: (tokenState && tokenState.token_data ? tokenState.token_data.identity : null),
			token: tokenState.token,
		};
	}

}

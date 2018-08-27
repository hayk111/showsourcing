import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { ReplaySubject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Credentials, RefreshTokenResponse } from '~features/auth/interfaces';

import { AuthState } from '~features/auth/interfaces';
import { AuthHttpService } from '~features/auth/services/auth-http.service';
import { TokenService } from '~features/auth/services/token.service';
import { TokenState } from '~features/auth/interfaces/token-state.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authState$ = new ReplaySubject<AuthState>(1);
	authState$ = this._authState$.asObservable();

	constructor(
		private authHttp: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router
	) { }

	init() {
		// when there is an access token that means we are authenticated
		this.tokenSrv.refreshToken$.pipe(
			map(tokenState => this.refreshTokenToAuthState(tokenState))
		).subscribe(this._authState$);
		// since we subscribe to the access token in the constructor this will have as a side effect
		// of telling if the user is connected or not.
		this.tokenSrv.restoreRefreshToken();
	}

	// we really are authenticated when the tokenSrv generates the accessToken
	login(credentials: Credentials) {
		return this.authHttp.login(credentials).pipe(
			tap(refreshToken => this.tokenSrv.storeRefreshToken(refreshToken)),
			tap(_ => this.router.navigate(['']))
		);
	}

	logout() {
		this.tokenSrv.clearTokens();
		this._authState$.next({ authenticated: false });
		this.router.navigate(['/guest', 'login']);
	}

	resetPw(email: string) {
		throw Error('not implemented yet');
	}

	register(creds: { email: string, password: string, firstName: string, lastName: string }) {
		return this.authHttp.register(creds).pipe(
			map(_ => ({ identifier: creds.email, password: creds.password })),
			switchMap(loginCreds => this.login(loginCreds))
		);
	}

	private refreshTokenToAuthState(tokenState: TokenState) {
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

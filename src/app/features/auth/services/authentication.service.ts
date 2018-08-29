import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { ReplaySubject, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { Credentials, RefreshTokenResponse, AuthStatus } from '~features/auth/interfaces';

import { TokenService } from '~features/auth/services/token.service';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authStatus$ = new BehaviorSubject<AuthStatus>(AuthStatus.PENDING);
	authStatus$ = this._authStatus$.asObservable();


	constructor(
		private tokenSrv: TokenService,
		private router: Router,
		private http: HttpClient
	) { }

	init() {
		// when there is a refresh token that means we are authenticated
		this.tokenSrv.refreshToken$.pipe(
			map(tokenState => this.refreshTokenToAuthState(tokenState))
		).subscribe(this._authStatus$);
		// since we subscribe to the refresh token in the constructor this will have as a side effect
		// of telling if the user is connected or not.
		this.tokenSrv.restoreRefreshToken();
	}

	// we really are authenticated when the tokenSrv generates the accessToken
	login(credentials: Credentials) {
		const loginObj = this.getLoginObject(credentials);
		return this.http.post<RefreshTokenResponse>(`${environment.apiUrl}/auth`, loginObj).pipe(
			tap(refreshToken => this.tokenSrv.storeRefreshToken(refreshToken)),
			tap(_ => this.router.navigate([''])),
			catchError(err => {
				this._authStatus$.next(AuthStatus.NOT_AUTHENTICATED);
				return of(err);
			})
		);
	}

	private getLoginObject(credentials: Credentials) {
		return {
			app_id: '',
			provider: 'password',
			data: credentials.identifier,
			user_info: {
				register: false,
				password: credentials.password
			}
		};
	}

	logout() {
		this.tokenSrv.clearTokens();
		this._authStatus$.next(AuthStatus.NOT_AUTHENTICATED);
		this.router.navigate(['/guest', 'login']);
	}

	resetPw(email: string) {
		// this.http.post(`${environment.apiUrl}/api/password/${email}/reset`, {})
		throw Error('not implemented yet');
	}

	register(creds: { email: string, password: string, firstName: string, lastName: string }) {
		return this.http.post(`${environment.signupUrl}`, creds).pipe(
			map(_ => ({ identifier: creds.email, password: creds.password })),
			switchMap(loginCreds => this.login(loginCreds))
		);
	}

	private refreshTokenToAuthState(tokenState: TokenState): AuthStatus {
		return tokenState ? AuthStatus.AUTHENTICATED : AuthStatus.NOT_AUTHENTICATED;
	}

}

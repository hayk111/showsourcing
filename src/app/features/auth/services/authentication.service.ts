import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import gql from 'graphql-tag';
import { ReplaySubject, BehaviorSubject, of } from 'rxjs';
import { map, switchMap, tap, catchError, shareReplay } from 'rxjs/operators';
import { Credentials, RefreshTokenResponse, AuthStatus, AuthState } from '~features/auth/interfaces';

import { TokenService } from '~features/auth/services/token.service';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RefreshTokenPostBody } from '~features/auth/interfaces/refresh-token-post-body.interface';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authState$ = new BehaviorSubject<AuthState>({ status: AuthStatus.PENDING });
	authStatus$ = this._authState$.asObservable().pipe(map(state => state.status), shareReplay(1));
	userId$ = this._authState$.asObservable().pipe(map(state => state.userId), shareReplay(1));
	urlToRedirectOnAuth: string;


	constructor(
		private tokenSrv: TokenService,
		private router: Router,
		private http: HttpClient
	) { }

	init() {
		// when there is a refresh token that means we are authenticated
		this.tokenSrv.refreshToken$.pipe(
			map(tokenState => this.refreshTokenToAuthState(tokenState))
		).subscribe(this._authState$);

		// since we subscribe to the refresh token in the constructor this will have as a side effect
		// of telling if the user is connected or not.
		this.tokenSrv.restoreRefreshToken();
	}

	// we really are authenticated when the tokenSrv generates the accessToken
	login(credentials: Credentials) {
		const refPostObj = this.getRefreshTokenObject(credentials);
		return this.tokenSrv.getRefreshToken(refPostObj);
	}

	private getRefreshTokenObject(credentials: Credentials): RefreshTokenPostBody {
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
		this._authState$.next({ status: AuthStatus.NOT_AUTHENTICATED });
		this.router.navigate(['/guest', 'login']);
	}

	checkPassword(credentials: Credentials): Observable<boolean> {
		const refPostBody = this.getRefreshTokenObject(credentials);
		return this.http.post<RefreshTokenResponse>(`${environment.realmUrl}/auth`, refPostBody).pipe(
			map(_ => true),
			catchError(_ => {
				return of(false);
			})
		);
	}

	changePassword(userId: string, password: string): Observable<boolean> {
		return this.http.post<RefreshTokenResponse>(`${environment.realmUrl}/signup/user/${userId}/password`, { password }).pipe(
			map(_ => true),
			catchError(_ => {
				return of(false);
			})
		);

	}

	resetPassword(email: string) {
		return this.http.post(`${environment.apiUrl}/signup/reset-password`, { email });
	}

	register(creds: { email: string, password: string, firstName: string, lastName: string }) {
		return this.http.post(`${environment.apiUrl}/signup/user`, creds).pipe(
			map(_ => ({ identifier: creds.email, password: creds.password })),
			switchMap(loginCreds => this.login(loginCreds))
		);
	}

	private refreshTokenToAuthState(tokenState: TokenState): AuthState {
		if (tokenState) {
			return {
				status: AuthStatus.AUTHENTICATED,
				userId: tokenState.token_data.identity
			};
		} else {
			return {
				status: AuthStatus.NOT_AUTHENTICATED
			};
		}
	}
}

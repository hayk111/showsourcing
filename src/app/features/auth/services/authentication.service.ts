import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { AuthState, AuthStatus, Credentials, RefreshTokenResponse } from '~features/auth/interfaces';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { TokenService } from '~features/auth/services/token.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authState$ = new BehaviorSubject<AuthState>({ status: AuthStatus.PENDING });
	authStatus$ = this._authState$.asObservable().pipe(
		map(state => state.status),
		shareReplay(1)
	);
	/** whether the user is authenticated */
	isAuthenticated$ = this.authStatus$.pipe(
		map(status => status === AuthStatus.AUTHENTICATED),
		shareReplay(1)
	);
	/** sends event when the user authenticates */
	authenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.AUTHENTICATED),
		shareReplay(1)
	);
	/** sends event when the user logs out */
	notAuthenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		shareReplay(1)
	);
	userId$ = this._authState$.asObservable().pipe(
		map(state => state.userId),
		shareReplay(1)
	);
	urlToRedirectOnAuth: string;

	constructor(
		private tokenSrv: TokenService,
		private router: Router,
		private http: HttpClient,
	) { }

	init() {
		this.tokenSrv.restoreRefreshToken();
		// when there is a refresh token that means we are authenticated
		this.tokenSrv.refreshToken$.pipe(
			map(tokenState => this.refreshTokenToAuthState(tokenState))
		).subscribe(this._authState$);
	}

	// we really are authenticated when the tokenSrv generates the accessToken
	login(credentials: Credentials) {
		return this.tokenSrv.getRefreshToken(credentials);
	}

	logout() {
		this.router.navigate(['guest', 'login']);
		this.tokenSrv.clearTokens();
		this._authState$.next({ status: AuthStatus.NOT_AUTHENTICATED });
	}

	checkPassword(credentials: Credentials): Observable<boolean> {
		const refBody = this.tokenSrv.getRefreshTokenObject(credentials, 'password');
		return this.http.post<RefreshTokenResponse>(`${environment.realmUrl}/auth`, refBody).pipe(
			map(_ => true),
			catchError(_ => of(false))
		);
	}

	changePassword(userId: string, password: string): Observable<boolean> {
		const endpoint = `${environment.apiUrl}/signup/user/${userId}/password`;
		return this.tokenSrv.getAccessToken().pipe(
			map((tokenState: TokenState) => ({ headers: new HttpHeaders({ Authorization: tokenState.token }) })),
			switchMap(opts => this.http.post<RefreshTokenResponse>(endpoint, { password }, opts)),
			map(token => !!token),
			catchError(_ => of(false))
		);
	}

	resetPassword({ email }: { email: string }) {
		// TODO: should be renamed recoverPassword instead (method and endpoint)
		return this.http.post(`${environment.apiUrl}/signup/user/reset-password`, { email });
	}

	confirmResetPassword({ token, password }: { token: string; password: string; }) {
		// TODO: to be changed with the right endpoint
		return this.http.post(`${environment.apiUrl}/signup/user/token/${token}/password`, { token, password });
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

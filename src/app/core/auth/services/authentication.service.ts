import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthState, AuthStatus, Credentials, RefreshTokenResponse } from '~core/auth/interfaces';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { TokenService } from '~core/auth/services/token.service';

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
		this.tokenSrv.restoreRefreshToken('auth');
		this.tokenSrv.restoreFeedToken();
		// when there is a refresh token that means we are authenticated
		this.tokenSrv.authRefreshToken$.pipe(
			map(tokenState => this.refreshTokenToAuthState(tokenState))
		).subscribe(this._authState$);
	}

	// we really are authenticated when the tokenSrv generates the accessToken
	login(credentials: Credentials) {
		// lower case for email
		credentials.login = credentials.login.toLowerCase();
		return this.http.post<{ jwtToken: string, jwtTokenFeed: TokenState }>(`${environment.apiUrl}/user/auth`, credentials).pipe(
			tap(resp => this.tokenSrv.storeFeedToken(resp.jwtTokenFeed)),
			map(resp => resp.jwtToken),
			switchMap((jwt) => this.tokenSrv.getRealmRefreshToken(jwt)),
		);
	}

	logout() {
		this.router.navigate(['auth', 'login']);
		this.tokenSrv.clearTokens();
		this._authState$.next({ status: AuthStatus.NOT_AUTHENTICATED });
	}

	checkPassword(credentials: Credentials): Observable<boolean> {
		return this.http.post<{ jwtToken: string }>(`${environment.apiUrl}/user/auth`, credentials).pipe(
			map(_ => true),
			catchError(_ => of(false))
		);
	}

	changePassword(userId: string, password: string): Observable<boolean> {
		const endpoint = `${environment.apiUrl}/user/signup/user/${userId}/password`;
		return this.tokenSrv.getAccessToken(this.tokenSrv.authRefreshTokenSync).pipe(
			map((tokenState: TokenState) => ({ headers: new HttpHeaders({ Authorization: tokenState.token }) })),
			switchMap(opts => this.http.post<RefreshTokenResponse>(endpoint, { password }, opts)),
			map(token => !!token),
			catchError(_ => of(false))
		);
	}

	resetPassword(cred: { email: string }) {
		return this.http.post(`${environment.apiUrl}/user/password-reset-request`, cred);
	}

	confirmResetPassword({ token, password }: { token: string; password: string; }) {
		return this.http.post(`${environment.apiUrl}/user/password-reset`, { token, password });
	}

	register(creds: { email: string, password: string, firstName: string, lastName: string }) {
		creds.email = creds.email.toLowerCase();

		return this.http.post(`${environment.apiUrl}/user/signup`, creds).pipe(
			map(_ => ({ login: creds.email, password: creds.password })),
			switchMap(_ => this.login({ login: creds.email, password: creds.password }))
		);
	}

	validateEmail(token: string) {
		return this.http.post(`${environment.apiUrl}/user/email-validation`, { token });
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

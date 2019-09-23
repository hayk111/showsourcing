import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthStatus, Credentials } from '~core/auth/interfaces';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { LocalStorageService } from '~core/local-storage';

const STORAGE_EMAIL = 'EMAIL';
const FEED_TOKEN = 'feed-token';
const AUTH_TOKEN = 'jwt-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authState$ = new BehaviorSubject<AuthStatus>(AuthStatus.PENDING);
	authStatus$ = this._authState$.asObservable().pipe(
		shareReplay(1)
	);
	/** whether the user is authenticated */
	isAuthenticated$ = this.authStatus$.pipe(
		map(status => status === AuthStatus.AUTHENTICATED || status === AuthStatus.ANONYMOUS),
		shareReplay(1)
	);
	/** sends event when the user authenticates */
	authenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.AUTHENTICATED || status === AuthStatus.ANONYMOUS),
		map(_ => this.authToken),
		shareReplay(1)
	);
	/** sends event when the user logs out */
	notAuthenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		shareReplay(1)
	);

	urlToRedirectOnAuth: string;
	authToken: string;
	feedToken: TokenState;

	constructor(
		private router: Router,
		private http: HttpClient,
		private localStorage: LocalStorageService
	) { }

	init() {
		// 1. if there is an anonymous auth token present in the url, we login the user with said url
		// 2. if we find the a auth token in the local storage, we login the user with said token
		// but only if there is no email specified in the url because when an email is specified in the url
		// that means a link was clicked and we want to login with that user instead.
		// if the email is the same than the previous email however that's fine we can go through
		// as we don't want to reauthenticate then
		const anonymousToken = this.getAnonymousToken();
		const email = this.getEmailFromUrl();
		this.restoreTokens();

		if (anonymousToken) {
			// 1. check anonymous
			this.login({ token: anonymousToken }).subscribe();
		} else if (!email || (email === this.localStorage.getString(STORAGE_EMAIL))) {
			// 2. check auth token
			if (this.authToken) {
				// we consider the user authenticated,
				// since the token is going to be refreshed
				this._authState$.next(AuthStatus.AUTHENTICATED);
			}
		}
	}

	/**
	 * login with credentials or a token
	 * @param credentials either login + password or token as a string
	 */
	login(credentials: Credentials) {
		// lower case for email when using credentials
		if (credentials.login) {
			credentials.login = credentials.login.toLowerCase();
			this.localStorage.setString(STORAGE_EMAIL, credentials.login);
		}
		return this.http.post<{ jwtToken: string, jwtTokenFeed: TokenState }>(`${environment.apiUrl}/user/auth`, credentials).pipe(
			tap(resp => this.storeAuthToken(resp.jwtToken)),
			tap(resp => this.storeFeedToken(resp.jwtTokenFeed)),
			tap(resp => this._authState$.next(AuthStatus.AUTHENTICATED)),
			first()
		);
	}

	refreshAuthToken() {
		const headers = new HttpHeaders({ token: this.authToken, Authorization: this.authToken });
		return this.http.post(`${environment.apiUrl}/user/renew`, {}, { headers }).pipe(
			map((resp: any) => resp.token)
		);
	}

	logout(redirect = true) {
		if (redirect)
			this.router.navigate(['auth', 'login']);
		this.clearStorage();
		this._authState$.next(AuthStatus.NOT_AUTHENTICATED);
		setTimeout(_ => window.location.reload());
	}

	checkPassword(credentials: Credentials): Observable<boolean> {
		return this.http.post<{ jwtToken: string }>(`${environment.apiUrl}/user/auth`, credentials).pipe(
			map(_ => true),
			catchError(_ => of(false))
		);
	}

	changePassword(login: string, password: string, newPassword: string): Observable<boolean> {
		const endpoint = `${environment.apiUrl}/user/password-change`;
		return this.http.post<any>(endpoint, { login, password, newPassword }).pipe(
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

	getEmailFromUrl() {
		const search = new URLSearchParams(window.location.search);
		const emailBase64 = search.get('email');
		if (!emailBase64) {
			return undefined;
		}
		return atob(emailBase64);
	}

	private storeAuthToken(jwt: string) {
		this.authToken = jwt;
		this.localStorage.setString(AUTH_TOKEN, jwt);
	}

	private storeFeedToken(jwtObject: TokenState) {
		this.feedToken = jwtObject;
		this.localStorage.setItem(FEED_TOKEN, jwtObject);
	}


	private restoreTokens() {
		// TODO: expirity is checked in the interceptors
		this.feedToken = this.localStorage.getItem(FEED_TOKEN);
		this.authToken = this.localStorage.getString(AUTH_TOKEN);
	}

	private clearStorage() {
		this.localStorage.clear();
	}

	private getAnonymousToken() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get('token');
	}
}

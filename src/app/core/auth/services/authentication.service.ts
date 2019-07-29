import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Credentials as RealmCredentials, User as RealmUser } from 'realm-graphql-client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, first, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthState, AuthStatus, Credentials } from '~core/auth/interfaces';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { TokenService } from '~core/auth/services/token.service';
import { LocalStorageService } from '~core/local-storage';


export const STORAGE_EMAIL = 'EMAIL';

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
		map(status => status === AuthStatus.AUTHENTICATED || status === AuthStatus.ANONYMOUS),
		shareReplay(1)
	);
	/** sends event when the user authenticates */
	authenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.AUTHENTICATED || status === AuthStatus.ANONYMOUS),
		shareReplay(1)
	);
	/** sends event when the user logs out */
	notAuthenticated$ = this.authStatus$.pipe(
		filter(status => status === AuthStatus.NOT_AUTHENTICATED),
		shareReplay(1)
	);
	userId$ = this._authState$.asObservable().pipe(
		map(state => state.userId),
		filter(id => !!id),
		shareReplay(1)
	);
	urlToRedirectOnAuth: string;

	realmUser: RealmUser;

	constructor(
		private tokenSrv: TokenService,
		private router: Router,
		private http: HttpClient,
		private localStorage: LocalStorageService
	) { }

	init() {
		// if there is an anonymous auth token present in the url, we login the user with said url
		// if we find the a auth token in the local storage, we login the user with said token
		// but only if there is no email specified in the url
		const token = this.tokenSrv.getAnonymousToken();
		const email = this.getEmailFromUrl();
		if (token) {
			// check anonymous
			this.login({ token }).subscribe();
		} else {
			// check auth token
			if (!email || (email === this.localStorage.getString(STORAGE_EMAIL))) {
				this.realmUser = new RealmUser(this.tokenSrv.getRealmUser());
				const authState = this.realmUserToAuthState(this.realmUser);
				this._authState$.next(authState);
			}
		}
		this.tokenSrv.restoreFeedToken();
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
			tap(resp => this.tokenSrv.storeJwtTokens(resp.jwtTokenFeed)),
			map(resp => resp.jwtToken),
			switchMap(jwt => this.jwtToRealmUser(jwt)),
			tap(realmUser => this.realmUser = realmUser),
			tap(realmUser => this.tokenSrv.storeRealmUser(realmUser)),
			map(realmUser => this.realmUserToAuthState(realmUser)),
			tap(authState => this._authState$.next(authState)),
			first()
		);
	}

	logout(redirect = true) {
		if (redirect)
			this.router.navigate(['auth', 'login']);
		this.tokenSrv.clearTokens();
		this._authState$.next({ status: AuthStatus.NOT_AUTHENTICATED });
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

	private realmUserToAuthState(realmUser: RealmUser): AuthState {
		if (realmUser && realmUser.identity) {
			return {
				status: AuthStatus.AUTHENTICATED,
				userId: realmUser.identity
			};
		} else {
			return {
				status: AuthStatus.NOT_AUTHENTICATED
			};
		}
	}

	getEmailFromUrl() {
		const search = new URLSearchParams(window.location.search);
		const emailBase64 = search.get('email');
		if (!emailBase64) {
			return undefined;
		}
		return atob(emailBase64);
	}

	private jwtToRealmUser(jwt: string) {
		const credentials = RealmCredentials.jwt(jwt);
		return RealmUser.authenticate(credentials, environment.graphqlAuthUrl);
	}

}

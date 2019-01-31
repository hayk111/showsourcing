import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { User as RealmUser } from 'realm-graphql-client';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { AuthState, AuthStatus, Credentials } from '~core/auth/interfaces';
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
		const realmUser = this.tokenSrv.restoreRealmUser();
		const authState = this.realmUserToAuthState(realmUser);
		this._authState$.next(authState);
		this.tokenSrv.restoreFeedToken();
	}

	login(credentials: Credentials) {
		// lower case for email
		credentials.login = credentials.login.toLowerCase();
		return this.http.post<{ jwtToken: string, jwtTokenFeed: TokenState }>(`${environment.apiUrl}/user/auth`, credentials).pipe(
			tap(resp => this.tokenSrv.storeJwtTokens(resp.jwtTokenFeed)),
			map(resp => resp.jwtToken),
			switchMap((jwt) => this.tokenSrv.getRealmUser(jwt)),
			map(realmUser => this.realmUserToAuthState(realmUser)),
			tap(authState => this._authState$.next(authState))
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
		const opts = { headers: new HttpHeaders({ Authorization: this.tokenSrv.realmUser.token }) };
		return this.http.post<any>(endpoint, { password }, opts).pipe(
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
}

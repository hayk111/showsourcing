import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, throwError, of } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { LocalStorageService } from '~shared/local-storage';
import { AuthModule } from '~features/auth/auth.module';
import { environment } from 'environments/environment.prod';
import { TokenState } from '~features/auth/interfaces/token-state.interface';


const REFRESH_TOKEN_NAME = 'refreshToken';
const ACCESS_TOKEN_PRE = 'ACCESS_TOKEN-';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	/** token names we store */
	private storedTokenNames = [];

	// timeout variable. The timeout will refresh the access token.
	private timers: any[] = [];
	private _refreshToken$ = new ReplaySubject<TokenState>(1);
	refreshToken$ = this._refreshToken$.asObservable();
	private _guestRefreshToken$ = new ReplaySubject<TokenState>(1);
	guestRefreshToken$ = this._guestRefreshToken$.asObservable();

	constructor(private localStorageSrv: LocalStorageService, private http: HttpClient) { }

	clearTokens(): void {
		this.storedTokenNames.forEach(name => this.localStorageSrv.remove(name));
		this.stopTimers();
	}

	/**
	 * Restores the refresh token from the local storage,
	 * so we don't have to relogin on every refresh
	 */
	restoreRefreshToken(): void {
		const refreshToken = this.localStorageSrv.getItem(REFRESH_TOKEN_NAME) as TokenState;
		if (this.isValid(refreshToken))
			this._refreshToken$.next(refreshToken);
		else
			this._refreshToken$.next();
	}


	/** stores the access token we get on login */
	storeRefreshToken(resp: RefreshTokenResponse) {
		this.localStorageSrv.setItem(REFRESH_TOKEN_NAME, resp.refresh_token);
	}

	/** gets a guest refresh token for when we are authenticated as guest */
	getGuesRefreshToken(token: string): void {
		this.http.get<RefreshTokenResponse>(`https://ros-dev3.showsourcing.com/token/${token}`).pipe(
			map(resp => resp.refresh_token)
		).subscribe(refreshToken => this._guestRefreshToken$.next(refreshToken));
	}

	/** revokes guest access */
	revokeGuestRefreshToken() {
		this._guestRefreshToken$.next();
	}

	/** to get an access token from a request token */
	getAccessToken(refreshToken: TokenState, name: string) {
		// if we have a valid accessToken in the local storage that's the one we return
		if (name) {
			// if we have a valid accessToken in the local storage that's the one we return
			const lastAccessToken: TokenState = this.localStorageSrv.getItem(ACCESS_TOKEN_PRE + name);
			if (lastAccessToken && this.isValid(lastAccessToken)) {
				return of(lastAccessToken);
			}
		}

		return this.fetchAccessToken(refreshToken, name);
	}

	private fetchAccessToken(refreshToken: TokenState, name: string, shouldRefresh?: boolean): Observable<TokenState> {
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken.token,
		};
		return this.http.post<AccessTokenResponse>(`${environment.apiUrl}/auth`, accessObj).pipe(
			map(accessTokenResp => accessTokenResp.user_token),
			tap(tokenState => this.storeAccessToken(tokenState, name))
		);
	}

	private storeAccessToken(token: TokenState, name: string) {
		this.localStorageSrv.setItem(ACCESS_TOKEN_PRE + name, token);
	}

	/** will destroy the timeout that was set to ask for a new AccessToken */
	private stopTimers() {
		this.timers.forEach(timer => window.clearTimeout(timer));
	}

	private isValid(token: TokenState) {
		return token.token_data.expires * 1000 > Date.now();
	}

}

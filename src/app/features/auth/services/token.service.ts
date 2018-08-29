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
import { log, LogColor } from '~utils';


const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN';
const ACCESS_TOKEN_MAP = 'ACCESS_TOKEN_MAP';

@Injectable({
	providedIn: 'root'
})
export class TokenService {

	// timeout variable. The timeout will refresh the access token.
	private timers: any[] = [];
	private _refreshToken$ = new ReplaySubject<TokenState>(1);
	refreshToken$ = this._refreshToken$.asObservable();
	private _guestRefreshToken$ = new ReplaySubject<TokenState>(1);
	guestRefreshToken$ = this._guestRefreshToken$.asObservable();

	constructor(
		private localStorageSrv: LocalStorageService,
		private http: HttpClient
	) { }

	/**
	 * Restores the refresh token from the local storage,
	 * so we don't have to relogin on every refresh.
	 * This is called when the app starts
	 */
	restoreRefreshToken(): TokenService {
		log.info(`%c Restoring refresh token`, LogColor.SERVICES);
		const refreshToken = this.localStorageSrv.getItem(REFRESH_TOKEN_NAME) as TokenState;
		if (refreshToken && this.isValid(refreshToken))
			this._refreshToken$.next(refreshToken);
		else
			this._refreshToken$.next();
		return this;
	}

	/** stores the access token we get on login */
	storeRefreshToken(resp: RefreshTokenResponse): TokenService {
		log.info(`%c Storring refresh token: ${resp.refresh_token}`, LogColor.SERVICES);
		this.localStorageSrv.setItem(REFRESH_TOKEN_NAME, resp.refresh_token);
		this._refreshToken$.next(resp.refresh_token);
		return this;
	}

	/** gets a guest refresh token for when we are authenticated as guest */
	getGuestRefreshToken(token: string): TokenService {
		this.http.get<RefreshTokenResponse>(`https://ros-dev3.showsourcing.com/token/${token}`).pipe(
			map(resp => resp.refresh_token)
		).subscribe(refreshToken => this._guestRefreshToken$.next(refreshToken));
		return this;
	}

	/** revokes guest access */
	revokeGuestRefreshToken(): TokenService {
		this._guestRefreshToken$.next();
		return this;
	}

	/** to get an access token from a request token */
	getAccessToken(refreshToken: TokenState, name: string): Observable<TokenState> {
		log.info(`%c Getting access token for ${name}`, LogColor.SERVICES);
		// if we have a valid accessToken in the local storage that's the one we return
		if (name) {
			// if we have a valid accessToken in the local storage that's the one we return
			const accessTokenMap = this.getAccessTokenMap();
			const lastAccessToken = accessTokenMap[name];
			if (lastAccessToken && this.isValid(lastAccessToken)) {
				return of(lastAccessToken);
			}
		}
		return this.fetchAccessToken(refreshToken, name);
	}

	/** gets an access token from a refresh token and stores it */
	private fetchAccessToken(refreshToken: TokenState, name: string): Observable<TokenState> {
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

	/** store access token at ACCESS_TOKEN_PRE-name */
	private storeAccessToken(token: TokenState, name: string) {
		log.info(`%c Saving access token ${token}`, LogColor.SERVICES);
		const accessTokenMap = this.getAccessTokenMap();
		accessTokenMap[name] = token;
		this.localStorageSrv.setItem(ACCESS_TOKEN_MAP, accessTokenMap);
	}

	/** gets the map of access token */
	private getAccessTokenMap(): { [key: string]: TokenState } {
		return this.localStorageSrv.getItem(ACCESS_TOKEN_MAP) || {};
	}


	/** clear current tokens, called on logout */
	clearTokens(): void {
		log.info(`%c Clearing tokens`, LogColor.SERVICES);
		this.localStorageSrv.remove(ACCESS_TOKEN_MAP);
		this.localStorageSrv.remove(REFRESH_TOKEN_NAME);
		this._refreshToken$.next();
	}

	/** check if a token has expired */
	private isValid(token: TokenState) {
		return token.token_data.expires * 1000 > Date.now();
	}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, throwError, of } from 'rxjs';
import { tap, catchError, switchMap, map, shareReplay, first } from 'rxjs/operators';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { LocalStorageService } from '~shared/local-storage';
import { AuthModule } from '~features/auth/auth.module';
import { environment } from 'environments/environment.prod';
import { TokenState } from '~features/auth/interfaces/token-state.interface';
import { log, LogColor } from '~utils';
import { filter } from 'rxjs/operators';
import { Credentials } from '~features/auth';
import { RefreshTokenPostBody } from '~features/auth/interfaces/refresh-token-post-body.interface';


const REFRESH_TOKEN_NAME = 'REFRESH_TOKEN';
const ACCESS_TOKEN_MAP = 'ACCESS_TOKEN_MAP';


@Injectable({
	providedIn: 'root'
})
export class TokenService {

	// timeout variable. The timeout will refresh the access token.
	private timers: any[] = [];
	private _refreshToken$ = new ReplaySubject<TokenState>(1);
	refreshToken$ = this._refreshToken$.asObservable().pipe(shareReplay(1));
	private _guestRefreshToken$ = new ReplaySubject<TokenState>(1);

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
		// the refresh token are long lived at the moment (10 years),
		// let's make a check that the token is still valid for 1 month though
		const validUntilMs = 1000 * 60 * 60 * 24 * 31;
		if (refreshToken && this.isValid(refreshToken, validUntilMs))
			this._refreshToken$.next(refreshToken);
		else
			this._refreshToken$.next();
		return this;
	}

	getRefreshToken(refPostBody: RefreshTokenPostBody) {
		return this.http.post<RefreshTokenResponse>(`${environment.realmUrl}/auth`, refPostBody).pipe(
			tap(refreshToken => this.storeRefreshToken(refreshToken)),
			catchError(err => {
				this._refreshToken$.next();
				return of(err);
			})
		);
	}

	/** stores the access token we get on login */
	private storeRefreshToken(resp: RefreshTokenResponse): TokenService {
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
	getAccessToken(realmPath: string): Observable<TokenState> {
		log.info(`%c Getting access token for ${realmPath}`, LogColor.SERVICES);
		// if we have a valid accessToken in the local storage that's the one we return
		if (realmPath) {
			// if we have a valid accessToken in the local storage that's the one we return
			const accessTokenMap = this.getAccessTokenMap();
			const lastAccessToken = accessTokenMap[realmPath];
			if (lastAccessToken && this.isValid(lastAccessToken)) {
				return of(lastAccessToken);
			}
		}
		return this.fetchAccessToken(realmPath);
	}

	/** gets an access token from a refresh token and stores it */
	private fetchAccessToken(realmPath: string): Observable<TokenState> {
		// getting access token from the refresh token
		return this.refreshToken$.pipe(
			filter(refreshToken => !!refreshToken),
			map(refreshToken => ({
				app_id: '',
				provider: 'realm',
				data: refreshToken.token,
				// path: realmPath
			})
			),
			switchMap(accessObj => this.http.post<AccessTokenResponse>(`${environment.realmUrl}/auth`, accessObj)),
			map(accessTokenResp => accessTokenResp.user_token),
			tap(tokenState => this.storeAccessToken(tokenState, realmPath))
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
	private isValid(token: TokenState, validUntilMs = 0) {
		return token.token_data.expires * 1000 > Date.now() + validUntilMs;
	}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Credentials } from '~core/auth';
import { AccessTokenResponse } from '~core/auth/interfaces/access-token-response.interface';
import { RefreshTokenPostBody } from '~core/auth/interfaces/refresh-token-post-body.interface';
import { RefreshTokenResponse } from '~core/auth/interfaces/refresh-token-response.interface';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { LocalStorageService } from '~core/local-storage';
import { log, LogColor } from '~utils';






const REFRESH_TOKEN_MAP = 'REFRESH_TOKEN_MAP';
const ACCESS_TOKEN_MAP = 'ACCESS_TOKEN_MAP';


@Injectable({
	providedIn: 'root'
})
export class TokenService {

	private _authRefreshToken$ = new ReplaySubject<TokenState>(1);
	authRefreshToken$ = this._authRefreshToken$.asObservable().pipe(shareReplay(1));
	authRefreshTokenSync: TokenState;
	private _onboardingRefreshToken$ = new ReplaySubject<TokenState>(1);
	onboardingRefreshToken$ = this._onboardingRefreshToken$.asObservable().pipe(shareReplay(1));
	onboardingRefreshTokenSync: TokenState;
	private _rfqRefreshToken$ = new ReplaySubject<TokenState>(1);
	rfqRefreshToken$ = this._rfqRefreshToken$.asObservable().pipe(shareReplay(1));
	rfqRefreshTokenSync: TokenState;

	constructor(
		private localStorageSrv: LocalStorageService,
		private http: HttpClient
	) {
		this.authRefreshToken$.subscribe(token => this.authRefreshTokenSync = token);
	}

	/**
	 * Restores the refresh token from the local storage,
	 * so we don't have to relogin on every refresh.
	 * This is called when the app starts
	 */
	async restoreRefreshToken(name: string): Promise<TokenState> {
		log.info(`%c Restoring refresh token`, LogColor.SERVICES);
		const refreshTokenMap = this.localStorageSrv.getItem(REFRESH_TOKEN_MAP) || {};
		const refreshToken = refreshTokenMap[name];
		// the refresh token are long lived at the moment (10 years),
		// let's make a check that the token is still valid for 1 month though
		const validUntilMs = 1000 * 60 * 60 * 24 * 31;
		const isValidOnClient = refreshToken && this.isValid(refreshToken, validUntilMs);
		const isValidOnServer = await (isValidOnClient ? this.isValidOnServer(refreshToken) : Promise.resolve(true));

		if (refreshToken && isValidOnClient && isValidOnServer)
			this.pushToken(name, refreshToken);
		else
			this.pushToken(name);

		return refreshToken;
	}

	/** Pushes token to correct subject */
	private pushToken(name: string, token?: TokenState) {
		switch (name) {
			case 'auth':
				this._authRefreshToken$.next(token);
				return this.authRefreshToken$;
			case 'supplier-onboarding':
				this._onboardingRefreshToken$.next(token);
				return this.onboardingRefreshToken$;
			case 'rfq':
				this._rfqRefreshToken$.next(token);
				return this.rfqRefreshToken$;
		}
	}

	/**
	 * @param jwt : jwt
	 * @param name : name of the token
	 */
	getRealmRefreshToken(jwt: string, name = 'auth')
		: Observable<TokenState> {
		const refObj = this.getRefreshTokenObject(jwt);
		return this.http.post<RefreshTokenResponse>(environment.graphqlAuthUrl, refObj).pipe(
			map((refreshTokenResp: RefreshTokenResponse) => refreshTokenResp.refresh_token),
			tap((refreshToken: TokenState) => this.storeRefreshToken(name, refreshToken)),
			catchError(err => {
				this.pushToken(name);
				return throwError(err);
			})
		);
	}

	private getRefreshTokenObject(jwt: string)
		: RefreshTokenPostBody {
		return {
			app_id: '',
			provider: 'jwt',
			data: jwt,
		};
	}


	/** stores the access token we get on login */
	private storeRefreshToken(name: string, token: TokenState): TokenService {
		log.info(`%c Storring refresh token: ${token}`, LogColor.SERVICES);
		const refreshmap = this.localStorageSrv.getItem(REFRESH_TOKEN_MAP) || {};
		refreshmap[name] = token;
		this.localStorageSrv.setItem(REFRESH_TOKEN_MAP, refreshmap);
		this.pushToken(name, token);
		return this;
	}

	/** gets a guest refresh token for when we are authenticated as guest */
	getGuestRefreshToken(token: string) {
		return this.http.get<RefreshTokenResponse>(`${environment.apiUrl}/token/${token}`).pipe(
			map(resp => resp.refresh_token),
			tap(refreshToken => this._rfqRefreshToken$.next(refreshToken))
		);
	}

	/** revokes guest access */
	revokeGuestRefreshToken(): TokenService {
		this._rfqRefreshToken$.next();
		return this;
	}

	/** to get an access token from a request token */
	getAccessToken(refreshToken: TokenState, realmPath?: string): Observable<TokenState> {
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
		return this.fetchAccessToken(refreshToken, realmPath);
	}

	/** gets an access token from a refresh token and stores it */
	private fetchAccessToken(refreshToken: TokenState, realmPath: string): Observable<TokenState> {
		// getting access token from the refresh token
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken.token,
			path: realmPath
		};
		return this.http.post<AccessTokenResponse>(environment.graphqlAuthUrl, accessObj).pipe(
			tap(accessTokenResp => {
				// this is a quickfix since the old user token now its called access
				if (accessTokenResp.user_token) accessTokenResp.access_token = accessTokenResp.user_token;
				if (!accessTokenResp || !accessTokenResp.access_token)
					throw Error(`server didn't answer with an accessToken`);
			}),
			map(accessTokenResp => accessTokenResp.access_token),
			tap(tokenState => this.storeAccessToken(tokenState, realmPath)),
		);
	}

	/** store access token at ACCESS_TOKEN_PRE-name */
	private storeAccessToken(token: TokenState, name: string) {
		log.info(`%c Saving access token ${name}`, LogColor.SERVICES);
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
		this.localStorageSrv.remove(REFRESH_TOKEN_MAP);
		this._authRefreshToken$.next();
		this._onboardingRefreshToken$.next();
		this._rfqRefreshToken$.next();
	}

	/** check if a token has expired */
	private isValid(token: TokenState, validUntilMs = 0) {
		return token.token_data.expires * 1000 > Date.now() + validUntilMs;
	}

	/** to check if the refreshToken is still valid on the server in case it restarts and the token is invalidated   */
	private isValidOnServer(refreshToken: TokenState): Promise<boolean> {
		// we will send a request for an access token to know if the request
		// token is really valid (the server might have restarted etc).
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken.token,
		};
		return this.http.post<AccessTokenResponse>(`${environment.apiUrl}/auth`, accessObj).pipe(
			map(accessToken => !!accessToken),
			catchError(err => of(false))
		).toPromise();

	}

}

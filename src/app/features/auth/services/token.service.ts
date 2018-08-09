import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, ReplaySubject, throwError } from 'rxjs';
import { tap, catchError, switchMap, map } from 'rxjs/operators';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { LocalStorageService } from '~shared/local-storage';
import { AccessTokenState } from '~features/auth/interfaces';
import { AuthModule } from '~features/auth/auth.module';
import { environment } from 'environments/environment.prod';
import { GuestAccessTokenState } from '~features/auth/interfaces/guest-access-token-state.interface';

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';


@Injectable({
	providedIn: 'root'
})
export class TokenService {
	private _accessToken$ = new ReplaySubject<AccessTokenState>(1);
	accessToken$ = this._accessToken$.asObservable();
	private _guestAccessToken$ = new ReplaySubject<GuestAccessTokenState>(1);
	guestAccessToken$ = this._guestAccessToken$.asObservable();
	// having the token accessible synchronously makes things easier in other places
	accessTokenSync: AccessTokenState;
	// timeout variable. The timeout will refresh the access token.
	private timer: any;
	private refreshToken: RefreshTokenResponse;

	constructor(private localStorageSrv: LocalStorageService, private http: HttpClient) {
		this.accessToken$.subscribe(token => this.accessTokenSync = token);
	}

	clearTokens(): void {
		this.localStorageSrv.remove(REFRESH_TOKEN_NAME);
		this.localStorageSrv.remove(ACCESS_TOKEN_NAME);
		this._accessToken$.next({ invalidated: true });
		this.stopTimer();
	}

	/**
	 * restore the tokens from the local storage. If only the refresh token is valid we ask
	 * for a new access token
	 */
	restoreAccessToken(): void {
		const accessToken: AccessTokenState = this.localStorageSrv.getItem(ACCESS_TOKEN_NAME);
		if (accessToken && this.isValid(accessToken)) {
			this._accessToken$.next(accessToken);
			// nothing to do here anymore
			return;
		}
		// if we don't have an access token we'll try to generate one
		this.refreshToken = this.localStorageSrv.getItem(REFRESH_TOKEN_NAME);

		if (this.refreshToken)
			this.generateAccessToken(this.refreshToken).subscribe();
		else
			this._accessToken$.next({ invalidated: true });

	}

	getGuestAccessToken(token: string): Observable<GuestAccessTokenState> {
		return this.http.get<RefreshTokenResponse>(`https://ros-dev3.showsourcing.com/token/${token}`).pipe(
			switchMap((refreshToken: any) => this.fetchAccessToken(refreshToken).pipe(
				map(accessTokenResponse => ({
					token: accessTokenResponse.user_token.token,
					token_data: accessTokenResponse.user_token.token_data,
					realm: refreshToken.realm as any,
				}))
			)),
			tap(guestToken => this._guestAccessToken$.next(guestToken))
		);
	}

	revokeGuestAccessToken() {
		this._guestAccessToken$.next({ invalidated: true });
	}

	generateAccessToken(refreshToken: RefreshTokenResponse): Observable<AccessTokenResponse> {
		this.localStorageSrv.setItem(REFRESH_TOKEN_NAME, refreshToken);
		this.refreshToken = refreshToken;
		return this.fetchAccessToken(refreshToken).pipe(
			tap(accessToken => this.onNewAccessToken(accessToken)),
			catchError(e => {
				this._accessToken$.next({ invalidated: true });
				return throwError(e);
			})
		);
	}

	fetchAccessToken(refreshToken): Observable<AccessTokenResponse> {
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken.refresh_token.token,
		};
		return this.http.post<AccessTokenResponse>(`${environment.apiUrl}/auth`, accessObj);
	}

	/** when a new access token arrives */
	private onNewAccessToken(accessToken: AccessTokenResponse) {
		const accessTokenState = {
			token: accessToken.user_token.token,
			token_data: accessToken.user_token.token_data,
		};
		this._accessToken$.next(accessTokenState);
		this.localStorageSrv.setItem(ACCESS_TOKEN_NAME, accessTokenState);
		this.startTimer(accessTokenState);
	}

	/** will ask for a new accessToken soon before it is invalidated */
	private startTimer(accessTokenState: AccessTokenState) {
		// expirity is in second while setTimeout in ms
		const errorDelta = 5 * 60 * 1000;
		const delta = (1000 * accessTokenState.token_data.expires) - Date.now();
		this.timer = setTimeout(_ => {
			this.fetchAccessToken(this.refreshToken);
		}, (delta - errorDelta));
	}

	/** will destroy the timeout that was set to ask for a new AccessToken */
	private stopTimer() {
		window.clearTimeout(this.timer);
	}

	private isValid(accessToken: AccessTokenState) {
		return accessToken.token_data.expires * 1000 > Date.now();
	}

}

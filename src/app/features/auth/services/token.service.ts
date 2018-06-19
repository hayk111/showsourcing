import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { LocalStorageService } from '~shared/local-storage';
import { AccessTokenState } from '~features/auth/interfaces';

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';


@Injectable()
export class TokenService {
	private _accessToken$ = new BehaviorSubject<AccessTokenState>({ pending: true, token: null, token_data: null });
	accessToken$ = this._accessToken$.asObservable();
	// timeout variable. The timeout will refresh the access token.
	timer: any;
	// TODO: could simplify some things with get & setter
	refreshToken: RefreshTokenResponse;

	constructor(private localStorageSrv: LocalStorageService, private http: HttpClient) { }

	clearTokens(): void {
		this.localStorageSrv.remove(REFRESH_TOKEN_NAME);
		this.localStorageSrv.remove(ACCESS_TOKEN_NAME);
		this._accessToken$.next({ pending: false, token: null, token_data: null });
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
			this.fetchAccessToken().subscribe();
		else
			this._accessToken$.next({ pending: false, token: null, token_data: null });

	}

	generateAccessToken(refreshToken: RefreshTokenResponse) {
		this.localStorageSrv.setItem(REFRESH_TOKEN_NAME, refreshToken);
		this.refreshToken = refreshToken;
		return this.fetchAccessToken();
	}

	private fetchAccessToken(): Observable<AccessTokenResponse> {
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: this.refreshToken.refresh_token.token,
		};
		return this.http.post<AccessTokenResponse>('api/auth', accessObj).pipe(
			tap(token => this.onNewAccessToken(token)),
			catchError(e => {
				this._accessToken$.next({ pending: false, token: null, token_data: null });
				return Observable.throw(e);
			})
		);
	}

	/** when a new access token arrives */
	private onNewAccessToken(accessToken: AccessTokenResponse) {
		const accessTokenState = {
			pending: false,
			token: accessToken.user_token.token,
			token_data: accessToken.user_token.token_data
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
			this.fetchAccessToken();
		}, (delta - errorDelta));
	}

	/** will destroy the timeout that was set to ask for a new AccessToken */
	private stopTimer() {
		window.clearTimeout(this.timer);
	}

	private isValid(accessToken: AccessTokenState) {
		return accessToken.token_data.expires > Date.now();
	}

}

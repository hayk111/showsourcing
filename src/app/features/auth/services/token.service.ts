import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AccessTokenResponse } from '~features/auth/interfaces/access-token-response.interface';
import { RefreshTokenResponse } from '~features/auth/interfaces/refresh-token-response.interface';
import { LocalStorageService } from '~shared/local-storage';

const ACCESS_TOKEN_NAME = 'accessToken';
const REFRESH_TOKEN_NAME = 'refreshToken';

@Injectable()
export class TokenService {
	private _accessToken$ = new Subject<AccessTokenResponse>();
	accessToken$ = this._accessToken$.asObservable();
	// timeout variable. The timeout will refresh the access token.
	timer: number;

	constructor(private localStorageSrv: LocalStorageService, private http: HttpClient) { }

	clearTokens(): void {
		this.localStorageSrv.remove(REFRESH_TOKEN_NAME);
		this.localStorageSrv.remove(ACCESS_TOKEN_NAME);
		this._accessToken$.next(null);
		this.stopTimer();
	}

	// TODO: return value ?
	restoreAccessToken(): void {
		const accessToken: AccessTokenResponse = this.localStorageSrv.getItem(ACCESS_TOKEN_NAME);
		if (accessToken && this.isValid(accessToken)) {
			this._accessToken$.next(accessToken);
			return;
		}
		const refreshToken: RefreshTokenResponse = this.localStorageSrv.getItem(REFRESH_TOKEN_NAME);

		if (refreshToken) {
			this.fetchAccessToken(refreshToken)
				.subscribe();
		}

	}

	generateAccessToken(refreshToken: RefreshTokenResponse) {
		this.localStorageSrv.setItem(REFRESH_TOKEN_NAME, refreshToken);
		return this.fetchAccessToken(refreshToken);
	}

	// TODO: error handling
	private fetchAccessToken(refreshToken: RefreshTokenResponse): Observable<AccessTokenResponse> {
		const accessObj = {
			app_id: '',
			provider: 'realm',
			data: refreshToken.refresh_token.token,
		};
		return this.http.post<AccessTokenResponse>('api/auth', accessObj).pipe(
			catchError(e => {
				this._accessToken$.next(null);
				return Observable.throw(e);
			}),
			tap(token => this.onNewAccessToken(token)),

		);
	}

	/** when a new access token arrives */
	private onNewAccessToken(accessToken: AccessTokenResponse) {
		this._accessToken$.next(accessToken);
		this.localStorageSrv.setItem(ACCESS_TOKEN_NAME, accessToken);
		this.startTimer(accessToken);
	}

	/** will ask for a new accessToken soon before it is invalidated */
	private startTimer(accessToken) {
		this.timer = setTimeout(_ => { });
	}

	/** will destroy the timeout that was set to ask for a new AccessToken */
	private stopTimer() {
		window.clearTimeout(this.timer);
	}

	private isValid(accessToken: AccessTokenResponse) {
		return accessToken.user_token.token_data.expires > Date.now();
	}

}

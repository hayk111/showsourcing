import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '~shared/local-storage';
import { Log } from '~utils';

import { AuthActions } from '~auth/store/actions';

@Injectable()
export class TokenService {
	private static TOKEN_NAME = 'TOKEN';
	private _token;

	constructor(private localStorageSrv: LocalStorageService, private store: Store<any>) {}

	// if we previously authenticated the token is present in the local storage.
	// then we request the api/user. The http request is gonna be automatically
	// populated with the token thank to the token-interceptor.service
	checkAuthToken(): boolean {
		if (this.token) {
			// if there is a token we need to check with the server if the user is authenticated
			// however there is no need to do so if the token is already expired
			const exp = this.checkExpirity();
			Log.debug(`TokenService: token found expired ? ${exp}`);
			if (!exp) {
				return true;
			}
		}
		return false;
	}

	removeToken() {
		this._token = undefined;
		this.localStorageSrv.remove(TokenService.TOKEN_NAME);
	}

	private parseJwt(token) {
		if (!token) return {};
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	private checkExpirity() {
		const token = this.parseJwt(this.token);
		if (token && token.exp) {
			const timeTillExp = token.exp * 1000 - Date.now();
			if (timeTillExp < 0) {
				this.expireToken();
				return true;
			}
			setTimeout(() => this.expireToken(), timeTillExp);
			return false;
		}
		return true;
	}

	private expireToken() {
		this.store.dispatch(AuthActions.logout());
	}

	get token() {
		if (!this._token) this._token = this.localStorageSrv.getString(TokenService.TOKEN_NAME);
		return this._token;
	}

	set token(token: string) {
		this.localStorageSrv.setString(TokenService.TOKEN_NAME, token);
		this._token = token;
	}
}

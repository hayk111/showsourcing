import { Injectable } from '@angular/core';

import { LocalStorageService } from '~shared/local-storage';

@Injectable()
export class TokenService {
	private static TOKEN_NAME = 'TOKEN';
	private _token;

	constructor(private localStorageSrv: LocalStorageService) { }

	removeToken() {
		this._token = undefined;
		this.localStorageSrv.remove(TokenService.TOKEN_NAME);
	}

	get token() {
		if (!this._token) this._token = this.localStorageSrv.getString(TokenService.TOKEN_NAME);
		return this._token;
	}

	saveToken(token: string) {
		if (token) {
			this.localStorageSrv.setString(TokenService.TOKEN_NAME, token);
			this._token = token;
		}
	}


}

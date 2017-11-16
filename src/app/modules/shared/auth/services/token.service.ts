import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../local-storage/local-storage.service';

@Injectable()
export class TokenService {
	private static TOKEN_NAME = 'TOKEN';
	private _token;


	constructor(private localStorageSrv: LocalStorageService) { }

	removeToken() {
		this._token = undefined;
		this.localStorageSrv.remove(TokenService.TOKEN_NAME);
	}

	parseJwt (token) {
		if (!token)
			return {};
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}


	get token() {
		if (!this._token)
				this._token = this.localStorageSrv.getString(TokenService.TOKEN_NAME);
		return this._token;
	}

	set token(token: string) {
		this.localStorageSrv.setString(TokenService.TOKEN_NAME, token);
		this._token = token;
	}
}

import { Injectable } from '@angular/core';

import { LocalStorageService } from '~shared/local-storage';

@Injectable()
export class TokenService {
	private static TOKEN_NAME = 'TOKEN';
	private _token;

	constructor(private localStorageSrv: LocalStorageService) { }

	getTokens(): { accessToken: string, refreshToken: string } {
		// const accessToken = this.localStorageSrv.getItem(this.ACCESS_TOKEN_NAME);
		// const refreshToken = this.localStorageSrv.getItem(this.REFRESH_TOKEN_NAME);
		throw Error('not implement');
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

	getAccessToken(refreshToken: string) {
		// this.http.get('graphql/auth', )
	}


}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '~shared/local-storage';

@Injectable()
export class TokenService {
	private static TOKEN_NAME = 'TOKEN';
	private _token;

	constructor(private localStorageSrv: LocalStorageService, private store: Store<any>) { }

	removeToken() {
		this._token = undefined;
		this.localStorageSrv.remove(TokenService.TOKEN_NAME);
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

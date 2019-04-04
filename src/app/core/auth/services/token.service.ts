import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Credentials, GraphQLConfig, User as RealmUser } from 'realm-graphql-client';
import { ReplaySubject } from 'rxjs';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { LocalStorageService } from '~core/local-storage';
import { log, LogColor } from '~utils';

const REALM_USER = 'REALM_USER';
const FEED_TOKEN = 'feed-token';

@Injectable({
	providedIn: 'root'
})
export class TokenService {


	private _jwtTokenFeed$ = new ReplaySubject<TokenState>();
	jwtTokenFeed$ = this._jwtTokenFeed$.asObservable();

	constructor(private localStorageSrv: LocalStorageService) { }

	/**
	 * Restores the refresh token from the local storage,
	 * so we don't have to relogin on every refresh.
	 * This is called when the app starts
	 */
	getRealmUser(): RealmUser | {} {
		log.info(`%c Restoring realm user token`, LogColor.SERVICES);
		return this.localStorageSrv.getItem(REALM_USER) || {};
	}


	/** stores the access token we get on login */
	storeRealmUser(user: RealmUser) {
		// "${REALM_USER} = user;secure; HttpOnly; Expires ";
		log.info(`%c Storring realm user token: ${user.identity} for ${user.server}`, LogColor.SERVICES);
		this.localStorageSrv.setItem(REALM_USER, user);
	}

	/** gets a guest refresh token for when we are authenticated as guest */
	getGuestRefreshToken(token: string) {
		throw Error('deprecated');
		// return this.http.get<RefreshTokenResponse>(`${environment.apiUrl}/token/${token}`).pipe(
		// 	map(resp => resp.refresh_token),
		// 	tap(refreshToken => this._rfqRefreshToken$.next(refreshToken))
		// );
	}

	/** revokes guest access */
	revokeGuestRefreshToken(): TokenService {
		throw Error('deprecated');
		// this._rfqRefreshToken$.next();
		// return this;
	}

	/** to get an access token from a request token */
	async getRealmConfig(user: RealmUser, realmPath?: string): Promise<GraphQLConfig> {
		return await GraphQLConfig.create(
			user,
			realmPath
		);
	}

	storeJwtTokens(token: TokenState) {
		this.localStorageSrv.setItem(FEED_TOKEN, token);
		this._jwtTokenFeed$.next(token);
	}

	restoreFeedToken() {
		const token: TokenState = this.localStorageSrv.getItem(FEED_TOKEN);
		// check if token is still valid, minus 10 so we still have some leeway
		if (token && token.token_data.expires > (Date.now() / 1000) - 10) {
			this._jwtTokenFeed$.next(token);
		}
	}

	/** clear current tokens, called on logout */
	clearTokens(): void {
		log.info(`%c Clearing tokens`, LogColor.SERVICES);
		this.localStorageSrv.remove(REALM_USER);
		this.localStorageSrv.remove(FEED_TOKEN);
	}

}

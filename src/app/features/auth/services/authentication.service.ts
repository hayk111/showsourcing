import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, catchError } from 'rxjs/operators';
import { Credentials } from '~features/auth/interfaces';
import { UserService } from '~features/user';
import { AuthHttpService } from './auth-http.service';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

const TOKEN_HEADER = 'X-Auth-Token';
// warning: this effect class is a bit of a cluster fuck and hard to follow. Should ultimately
// be refactored in something easier.
@Injectable()
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	private _authenticated$ = new BehaviorSubject<boolean>(null);
	authenticated$ = this._authenticated$.asObservable();

	constructor(
		private authHttp: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router,
	) {
		// this._refreshToken$.pipe(
		// 	switchMap(refreshToken => this.authHttp.fetchAccessToken(refreshToken)),
		// ).subscribe(token => this.onAccessTokenReceived(token));
	}

	// checking if user is already authenticated, if not then we do a logout
	// so we can remove unecessary things
	init() {
		const { accessToken, refreshToken } = this.tokenSrv.getTokens();
		if (accessToken) {
			this._authenticated$.next(true);
			return;
		}
		if (refreshToken) {
			// this._refreshToken$.next(refreshToken);
		}
	}

	login(credentials: Credentials) {
		return this.authHttp.login(credentials).pipe(
			// we save the token for when the user refresh the page
			// tap(r => this.tokenSrv.saveToken(r.headers.get(TOKEN_HEADER))),
			// we first put the user action, then the preloading action as the user is needed to make those
			// tap(r => this._authenticated$.next(true)),
			// tap(r => this.router.navigate(['']))
		);
	}


	logout() {
		// this.tokenSrv.clearTokens();
		this.router.navigate(['/guest', 'login']);
	}

	// checking if user is already authenticated, if not then we do a logout
	// so we can remove unecessary things
	checkAlreadyAuthenticated() {

	}

	resetPw(email: string) {
		return this.authHttp.resetPw(email);
	}

	register(creds: { email: string, password: string }) {
		// return this.srv.register(creds).pipe(
		// 	tap(_ => this.router.navigate([''])),
		// 	tap((r: HttpResponse<any>) => this.tokenSrv.saveToken(r.headers.get(TOKEN_HEADER))),
		// 	tap(r => this._authenticated$.next(true))
		// );
	}

	private onAccessTokenReceived(token: any) {
		debugger;
	}

}

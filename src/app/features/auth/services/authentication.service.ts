import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, take, catchError, map, switchMap } from 'rxjs/operators';
import { Credentials } from '~features/auth/interfaces';
import { UserService } from '~features/user';
import { AuthHttpService } from './auth-http.service';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
	// null because at the start we don't know yet, user could be authenticated with his token
	// then it's either true or false
	private _authenticated$ = new BehaviorSubject<boolean>(null);
	authenticated$ = this._authenticated$.asObservable();

	constructor(
		private authHttp: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router,
	) {

		// when there is an access token that means we are authenticated
		this.tokenSrv.accessToken$.pipe(
			map(token => !!token)
		).subscribe(this._authenticated$);
	}

	init() {
		// since we subscribe to the access token in the constructor this will have as a side effect
		// of telling if the user is connected or not.
		this.tokenSrv.restoreAccessToken();
	}

	login(credentials: Credentials) {
		return this.authHttp.login(credentials).pipe(
			switchMap(refreshToken => this.tokenSrv.generateAccessToken(refreshToken)),
			tap(_ => this.router.navigate(['']))
		);
	}


	logout() {
		this.tokenSrv.clearTokens();
		this.router.navigate(['/guest', 'login']);
	}

	resetPw(email: string) {
		throw Error('not implemented yet');
	}

	register(creds: { email: string, password: string }) {
		throw Error('not implemented yet');
	}

}

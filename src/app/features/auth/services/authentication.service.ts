import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from '@ngrx/effects';
import { tap, take, catchError } from 'rxjs/operators';
import { Credentials } from '~app/features/auth/interfaces';
import { UserService } from '~app/features/user';
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

	login(credentials: Credentials) {
		return this.srv.login(credentials).pipe(
			// we save the token for when the user refresh the page
			tap(r => this.tokenSrv.saveToken(r.headers.get(TOKEN_HEADER))),
			// we first put the user action, then the preloading action as the user is needed to make those
			tap(r => this.userSrv.setUser(r.body)),
			tap(r => this._authenticated$.next(true)),
			tap(r => this.router.navigate(['']))
		);
	}

	logout() {
		this.tokenSrv.removeToken();
		this.userSrv.resetUser();
		this.router.navigate(['/guest', 'login']);
	}

	// checking if user is already authenticated, if not then we do a logout
	// so we can remove unecessary things
	checkAlreadyAuthenticated() {
		this.srv.getUser().pipe(
			take(1),
		).subscribe(user => {
			this.userSrv.setUser(user);
			this._authenticated$.next(true);
		}, e => this._authenticated$.next(false));
	}

	resetPw(email: string) {
		return this.srv.resetPw(email);
	}

	register(creds: { email: string, password: string }) {
		return this.srv.register(creds).pipe(
			tap(_ => this.router.navigate([''])),
			tap((r: HttpResponse<any>) => this.tokenSrv.saveToken(r.headers.get(TOKEN_HEADER))),
			tap(r => this.userSrv.setUser(r.body)),
			tap(r => this._authenticated$.next(true))
		);
	}

	constructor(
		private actions$: Actions,
		private srv: AuthHttpService,
		private tokenSrv: TokenService,
		private router: Router,
		private route: ActivatedRoute,
		private userSrv: UserService
	) { }
}

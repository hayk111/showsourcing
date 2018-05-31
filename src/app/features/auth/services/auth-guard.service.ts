import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	CanActivateChild,
	Router,
	RouterStateSnapshot,
} from '@angular/router';

import { Observable } from 'rxjs';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { Log } from '~utils';
import { User } from '~models';
import { UserService } from '~features/user';
import { AuthenticationService } from '~features/auth/services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		Log.debug('check auth');
		return this.authSrv.authenticated$.pipe(
			// we need to filter the authstate when it's null because it means pending
			filter(auth => auth !== null),
			tap(d => { debugger; }),
			tap(auth => this.redirectOnAuth(auth))
		);
	}

	redirectOnAuth(authenticated: boolean) {
		if (!authenticated)
			this.router.navigate(['guest', 'login']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

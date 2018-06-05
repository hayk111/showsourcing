import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Log } from '~utils';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authState$.pipe(
			// we need to filter the authstate when it's null because it means pending
			filter(authState => !authState.pending),
			map(authState => authState.authenticated),
			distinctUntilChanged(),
			tap(authenticated => this.redirectOnUnAuthenticated(authenticated)),
			tap(authenticated => Log.debug('auth guard: authenticated ?', authenticated))
		);
	}

	redirectOnUnAuthenticated(authenticated: boolean) {
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

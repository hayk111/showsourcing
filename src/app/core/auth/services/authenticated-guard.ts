import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth/interfaces/auth-state.interface';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authStatus$.pipe(
			// tap(d => { debugger; }),
			filter(status => status !== AuthStatus.PENDING),
			tap(status => this.redirectOnUnAuthenticated(status, route, state)),
			tap(status => log.debug('%c auth guard: auth state ?', LogColor.GUARD, status)),
			map(status => status === AuthStatus.AUTHENTICATED)
		);
	}

	redirectOnUnAuthenticated(status: AuthStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		switch (status) {
			case AuthStatus.NOT_AUTHENTICATED:
				const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
				this.router.navigate(['auth', 'login'], { queryParams: { returnUrl } });
				break;
		}
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

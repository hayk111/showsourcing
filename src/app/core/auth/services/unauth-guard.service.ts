import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log, LogColor } from '~utils';

/** check if the user is authenticated and if so redirect to dashboard. Protects pages like login etc. */
@Injectable({
	providedIn: 'root'
})
export class UnauthGuardService implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authStatus$.pipe(
			tap(status => log.debug('%c unauth guard status :', LogColor.GUARD, status)),
			filter(status => status !== AuthStatus.PENDING),
			tap(status => this.redirectOnAuthenticated(status)),
			map(status => status === AuthStatus.NOT_AUTHENTICATED),
		);
	}

	redirectOnAuthenticated(authStatus: AuthStatus) {
		if (authStatus === AuthStatus.AUTHENTICATED)
			this.router.navigate(['']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { log, LogColor } from '~utils';
import { AuthModule } from '~features/auth/auth.module';
import { AuthStatus } from '~features/auth';

/** check if the user is authenticated and if so redirect to dashboard. Protects pages like login etc. */
@Injectable({
	providedIn: AuthModule
})
export class UnauthGuardService implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authStatus$.pipe(
			filter(status => status !== AuthStatus.PENDING),
			tap(status => log.debug('%c unauth guard status :', LogColor.GUARD, status)),
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

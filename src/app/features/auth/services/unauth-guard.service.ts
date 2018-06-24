import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { log } from '~utils';

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
		return this.authSrv.authState$.pipe(
			map(authState => authState.authenticated),
			distinctUntilChanged(),
			tap(authenticated => this.redirectOnAuthenticated(authenticated)),
			tap(authenticated => log.debug('%c unauth guard: authenticated ?', 'color: turquoise', authenticated)),
			map(authenticated => !authenticated)
		);
	}

	redirectOnAuthenticated(authenticated: boolean) {
		if (authenticated)
			this.router.navigate(['']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

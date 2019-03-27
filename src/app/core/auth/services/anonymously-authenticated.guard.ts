import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log, LogColor } from '~utils';

/** check if the user is authenticated and if so redirect to dashboard. Protects pages like login etc. */
@Injectable({
	providedIn: 'root'
})
export class AnonymouslyAuthenticatedGuard implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		// at the moment
		return of(true).pipe(
			tap(d => { debugger; })
		);
	}

	redirectOnAuthenticated(authStatus: AuthStatus) {
		if (authStatus === AuthStatus.ANONYMOUS)
			this.router.navigate(['']);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

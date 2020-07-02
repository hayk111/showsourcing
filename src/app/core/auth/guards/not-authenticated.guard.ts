import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IAuthState } from 'showsourcing-api-lib';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log, LogColor } from '~utils';

/** check if the user is authenticated and if so redirect to dashboard. Protects pages like login etc. */
@Injectable({
	providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authState$.pipe(
			tap(authState => {
				console.log('not authenticated guard!!:', authState);
			}),
			tap(authState => log.debug('%c unauth guard status :', LogColor.GUARD, authState)),
			filter(authState => authState !== 'AUTHENTICATING'),
			tap(authState => this.redirectOnAuthenticated(authState)),
			map(authState => authState === 'NOT_AUTHENTICATED'),
		);
	}

	redirectOnAuthenticated(authState: IAuthState) {
		if (authState === 'AUTHENTICATED') {
			this.router.navigate(['']);
		}
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

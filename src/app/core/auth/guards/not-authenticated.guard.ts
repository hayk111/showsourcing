import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log, LogColor } from '~utils';
import { AuthStatus } from '../services/auth-state.interface';
import { AuthState } from 'aws-amplify-angular/dist/src/providers';

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
				console.log('not authenticated guard!!:', authState.state);
			}),
			tap(authState => log.debug('%c unauth guard status :', LogColor.GUARD, authState.state)),
			filter(authState => authState.state !== AuthStatus.PENDING),
			tap(authState => this.redirectOnAuthenticated(authState)),
			map(authState => authState.state === AuthStatus.NOT_AUTHENTICATED),
		);
	}

	redirectOnAuthenticated(authState: AuthState) {
		if (authState.state === AuthStatus.AUTHENTICATED) {
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

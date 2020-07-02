import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAuthState } from 'showsourcing-api-lib';
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
		console.log('canActivate!!!!', route, state);
		return this.authSrv.authState$.pipe(
			tap(authState => this.redirectOnUnAuthenticated(authState, route, state)),
			tap(authState => log.debug('%c auth guard: auth state ?', LogColor.GUARD, authState)),
			map(authState => authState === 'AUTHENTICATED')
		);
	}

	redirectOnUnAuthenticated(authState: IAuthState, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log('AuthenticatedGuard -> redirectOnUnAuthenticated -> authState', authState);
		switch (authState) {
			case 'NOT_AUTHENTICATED':
				const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
				const queryParams = { returnUrl };
				this.router.navigate(['auth', 'sign-in'], { queryParams });
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

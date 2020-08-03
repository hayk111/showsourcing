import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IAuthState, state } from 'showsourcing-api-lib';
import { log } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {
	constructor(private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {

		return state.auth$.pipe(
			tap(authState => this.redirectOnUnAuthenticated(authState, route, _state)),
			map(authState => authState === 'AUTHENTICATED'),
		);
	}

	redirectOnUnAuthenticated(authState: IAuthState, route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
		log.debug(`authenticated guard -> ${authState === 'AUTHENTICATED'}`);
		switch (authState) {
			case 'NOT_AUTHENTICATED':
				const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : _state.url;
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

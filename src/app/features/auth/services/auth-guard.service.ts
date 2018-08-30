import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { log, LogColor } from '~utils';
import { AuthModule } from '~features/auth/auth.module';
import { AuthStatus } from '~features/auth/interfaces/auth-state.interface';

@Injectable({
	providedIn: AuthModule
})
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private authSrv: AuthenticationService, private router: Router) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.authSrv.authStatus$.pipe(
			filter(status => status !== AuthStatus.PENDING),
			tap(status => this.redirectOnUnAuthenticated(status, state)),
			tap(status => log.debug('%c auth guard: auth state ?', LogColor.GUARD, status)),
			map(status => status === AuthStatus.AUTHENTICATED)
		);
	}

	redirectOnUnAuthenticated(status: AuthStatus, state: RouterStateSnapshot) {
		switch (status) {
			case AuthStatus.NOT_AUTHENTICATED:
				this.router.navigate(['guest', 'login'], { queryParams: { returnUrl: state.url } });
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

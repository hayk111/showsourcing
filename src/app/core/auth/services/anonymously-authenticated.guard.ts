import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, tap, switchMap } from 'rxjs/operators';
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
		route: ActivatedRouteSnapshot
	): Observable<boolean> {
		const token = route.queryParamMap.get('token');
		return this.authSrv.authStatus$.pipe(
			switchMap(status => {
				if (status === AuthStatus.PENDING || status === AuthStatus.NOT_AUTHENTICATED)
					return this.authSrv.login({ token }).pipe(map((state) => state.status));
				else
					return this.authSrv.authStatus$;
			}),
			map(status => status === AuthStatus.ANONYMOUS)
		);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute);
	}
}

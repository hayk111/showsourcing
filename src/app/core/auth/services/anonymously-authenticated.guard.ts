import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthStatus } from '~core/auth';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { log } from '~utils/log';
import { LogColor } from '~utils/log-colors.enum';



/** check if the user is authenticated and if so redirect to dashboard. Protects pages like login etc. */
@Injectable({
	providedIn: 'root'
})
export class AnonymouslyAuthenticatedGuard implements CanActivate, CanActivateChild {


	constructor(
		private authSrv: AuthenticationService,
	) { }

	canActivate(
		route: ActivatedRouteSnapshot
	): Observable<boolean> {
		const token = route.queryParamMap.get('token');
		return this.authSrv.authStatus$.pipe(
			switchMap(status => {
				if (status === AuthStatus.NOT_AUTHENTICATED)
					return this.authSrv.login({ token }).pipe(
						map((state) => state.status)
					);
				else
					return this.authSrv.authStatus$;
			}),
			tap(status => log.debug(`%c AnonymouslyAuthenticatedGuard, status: ${status} token: ${token}, state: ${status}`, LogColor.GUARD)),
			map(status => status === AuthStatus.ANONYMOUS)
		);
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute);
	}
}

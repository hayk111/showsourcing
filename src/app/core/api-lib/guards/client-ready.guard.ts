import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { state } from 'lib';
import { tap, last, skip, shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClientReadyGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		routerState: RouterStateSnapshot
	): Observable<boolean> {
		return state.isUsable$.pipe(
			skip(1),
			tap(isUsable => {
				if (!isUsable) {
					this.redirectToLogin(route, routerState);
				}
			}),
			shareReplay()
		) as Observable<boolean>;
	}

	redirectToLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
		const queryParams = { returnUrl };
		this.router.navigate(['auth', 'sign-in'], { queryParams });
	}
}

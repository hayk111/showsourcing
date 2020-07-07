import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { state } from 'showsourcing-api-lib';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClientSyncedGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		routerState: RouterStateSnapshot
	): Observable<boolean> {
		return state.sync$.pipe(
			tap(synced => {
				if (!synced) {
					this.redirectToLogin(route, routerState);
				}
			})
		) as Observable<boolean>;
	}

	redirectToLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
		const queryParams = { returnUrl };
		this.router.navigate(['auth', 'sign-in'], { queryParams });
	}
}

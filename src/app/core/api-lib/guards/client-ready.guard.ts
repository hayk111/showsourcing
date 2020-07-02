import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { state } from 'lib';
import { tap, last, skip, shareReplay, filter } from 'rxjs/operators';

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
			filter(isUsable => !!isUsable),
			shareReplay()
		) as Observable<boolean>;
	}

}

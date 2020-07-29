import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { from, Observable, of } from 'showsourcing-api-lib/node_modules/rxjs';
import { first, concatMap } from 'rxjs/operators';

/**
 * helper to run multiple guards in sequence order instead of
 * parallel. It will take the guards from the data on the route
 */
@Injectable({
	providedIn: 'root'
})
export class SyncGuardHelper implements CanActivate {
	public constructor(public injector: Injector) {
	}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
		const canActivate = from(route.data.syncGuards).pipe(
			concatMap((value) => {
				const guard = this.injector.get(value);
				const result = guard.canActivate(route, state);
				if (result instanceof Observable) {
					return result.pipe(first());
				} else if (result instanceof Promise) {
					return from(result);
				} else {
					return of(result);
				}
			}),
			first((x) => x === false || x instanceof UrlTree, true),
		);
		return canActivate;
	}
}

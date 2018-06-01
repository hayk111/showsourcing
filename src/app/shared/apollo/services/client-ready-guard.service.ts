import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ApolloService } from '~shared/apollo/services';
import { Observable } from 'rxjs';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ClientReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private router: Router, private apolloSrv: ApolloService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloSrv.teamClientReady$.pipe(
			distinctUntilChanged(),
			filter(v => v !== null),
			tap(v => this.redirect(v)),
		);
	}

	redirect(ready: boolean) {
		if (!ready) {
			this.router.navigate(['user', 'server-issue']);
		}
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { log } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class GloabalClientsReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private apolloState: ApolloStateService) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.globalClientsReady$.pipe(
			tap(d => log.debug('%c GlobalClientsReadyGuard', 'color: turquoise', d))
		);
	}


	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(childRoute, state);
	}
}

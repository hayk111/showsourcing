import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { log, LogColor } from '~utils';
import { GuestClientInitializer } from '~shared/apollo';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from '~features/auth';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Injectable({
	providedIn: 'root'
})
export class GuestClientReadyGuardService implements CanActivate, CanActivateChild {
	private initialized = false;

	constructor(
		private apolloState: ApolloStateService,
		private guestInitializer: GuestClientInitializer,
		private tokenSrv: TokenService
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return true;
	}


	canActivateChild(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (!this.initialized) {
			this.guestInitializer.init();
			this.tokenSrv.getGuestAccessToken(route.params.token).pipe().subscribe();
			this.initialized = true;
		}
		return this.apolloState.guestClientReady$.pipe(
			tap(d => log.debug('%c GuestClientReadyGuard', LogColor.GUARD, d.ready)),
			filter(state => !state.pending),
			map(state => state.ready)
		);
	}
}

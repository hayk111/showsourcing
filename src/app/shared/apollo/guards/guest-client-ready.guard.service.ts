import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { ApolloStateService } from '~shared/apollo/services/initializers/apollo-state.service';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class GuestClientReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private apolloState: ApolloStateService) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.guestClientReady$.pipe(
			tap(d => log.debug('%c GuestClientReadyGuard', LogColor.GUARD, d.ready)),
			filter(state => !state.pending),
			map(state => state.ready)
		);
	}


	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}
}

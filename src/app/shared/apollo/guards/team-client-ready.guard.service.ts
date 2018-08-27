import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { log, LogColor } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class TeamClientReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private apolloState: ApolloStateService) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.teamClientReady$.pipe(
			filter(state => !state.pending),
			tap(d => log.debug('%c TeamClientReadyGuard', LogColor.GUARD, d.ready)),
			map(state => state.ready)
		);
	}


	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}
}

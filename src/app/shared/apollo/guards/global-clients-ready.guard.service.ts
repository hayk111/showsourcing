import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService } from '~shared/apollo';

@Injectable({
	providedIn: 'root'
})
export class GloabalClientsReadyGuardService implements CanActivate, CanActivateChild {

	constructor(private apolloState: ApolloStateService) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.globalClientsReady$.pipe(
			tap(d => log.debug('%c GlobalClientsReadyGuard', LogColor.GUARD, d.ready)),
			map(state => state.ready)
		);
	}


	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}
}

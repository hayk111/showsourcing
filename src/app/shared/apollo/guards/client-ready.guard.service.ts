import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService } from '~shared/apollo';
import { Inject } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		@Inject('clientName') private clientName: string,
		private apolloState: ApolloStateService
	) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.clientsReady$.pipe(
			map(readyState => readyState[this.clientName]),
			tap(d => log.debug(`%c ClientsReadyGuard, client: ${this.clientName}, ready: ${d.ready}`, LogColor.GUARD)),
			map(state => state.ready)
		);
	}

	goToIssues() {

	}


	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}
}

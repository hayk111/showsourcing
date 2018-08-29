import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService, State, ClientStatus } from '~shared/apollo';
import { Inject } from '@angular/core';
import { GLOBAL_CONSTANT_CLIENT, USER_CLIENT } from '~shared/apollo/services/apollo-client-names.const';


@Injectable({
	providedIn: 'root'
})
export class ClientReadyGuard implements CanActivate, CanActivateChild {
	constructor(
		private router: Router,
		private apolloState: ApolloStateService,
	) {
	}

	canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		const neededClients = route.data.neededClients;
		if (!neededClients || neededClients.length === 0) {
			throw Error('Client Ready guard used without neededClients in route data');
		}
		// check if all clients are ready
		return forkJoin(neededClients.map(client => this.checkReady(client))).pipe(
			map((allReady: boolean[]) => allReady.every(ready => ready))
		);
	}

	canActivateChild(route): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent);
	}

	private checkReady(client: string): Observable<boolean> {
		return this.apolloState.getClientStatus(client).pipe(
			filter(status => status !== ClientStatus.PENDING),
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${client}, state: ${status}`, LogColor.GUARD)),
			tap(status => this.redirect(status)),
			map(status => status === ClientStatus.READY)
		);
	}

	private redirect(status: ClientStatus) {
		switch (status) {
			case ClientStatus.DESTROYED:
				this.router.navigate(['guest', 'login']);
				break;
			case ClientStatus.ERROR:
				this.router.navigate(['server-issues']);
				break;
		}
	}

}

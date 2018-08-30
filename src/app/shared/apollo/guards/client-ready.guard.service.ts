import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService, ClientStatus } from '~shared/apollo';
import { Inject } from '@angular/core';
import { Client } from '~shared/apollo/services/apollo-client-names.const';


export abstract class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected client: Client
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.checkReady(this.client);
	}

	canActivateChild(route): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent);
	}

	protected checkReady(client: Client): Observable<boolean> {
		return this.apolloState.getClientStatus(client).pipe(
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${client}, state: ${status}`, LogColor.GUARD)),
			filter(status => status !== ClientStatus.PENDING),
			map(status => status === ClientStatus.READY),
		);
	}
}


@Injectable({
	providedIn: 'root'
})
export class GlobalDataClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) {
		super(router, apolloState, Client.GLOBAL_DATA);
	}
}

@Injectable({
	providedIn: 'root'
})
export class GlobalConstClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) {
		super(router, apolloState, Client.GLOBAL_CONSTANT);
	}
}

@Injectable({
	providedIn: 'root'
})
export class AllUserClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) {
		super(router, apolloState, Client.ALL_USER);
	}
}

@Injectable({
	providedIn: 'root'
})
export class UserClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) {
		super(router, apolloState, Client.USER);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TeamClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) {
		super(router, apolloState, Client.TEAM);
	}

}



import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
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

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.getClientStatus(this.client).pipe(
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${this.client}, state: ${status}`, LogColor.GUARD)),
			tap(status => this.redirect(status, route, state)),
			filter(status => status !== ClientStatus.PENDING),
			map(status => status === ClientStatus.READY),
		);
	}

	canActivateChild(route, state): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent, state);
	}


	protected redirect(status: ClientStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (status === ClientStatus.ERROR) {
			this.router.navigate(['server-issues']);
		}
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

	protected redirect(status: ClientStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (status === ClientStatus.ERROR) {
			this.router.navigate(['server-issues']);
		}
		if (status === ClientStatus.NOT_READY) {
			this.router.navigate(['user', 'pick-a-team']);
		}
	}
}



import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService, ClientStatus } from '~shared/apollo';
import { Inject } from '@angular/core';
import {
	GLOBAL_CONSTANT_CLIENT, USER_CLIENT,
	GLOBAL_DATA_CLIENT, ALL_USER_CLIENT, TEAM_CLIENT
} from '~shared/apollo/services/apollo-client-names.const';


export abstract class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected client: string
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.checkReady(this.client);
	}

	canActivateChild(route): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent);
	}

	protected checkReady(client: string): Observable<boolean> {
		return this.apolloState.getClientStatus(client).pipe(
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${client}, state: ${status}`, LogColor.GUARD)),
			filter(status => status !== ClientStatus.PENDING),
			tap(status => this.redirect(status)),
			map(status => status === ClientStatus.READY)
		);
	}

	protected redirect(status: ClientStatus) {
		switch (status) {
			case ClientStatus.NOT_READY:
				this.router.navigate(['guest', 'login']);
				break;
			case ClientStatus.ERROR:
				this.router.navigate(['server-issues']);
				break;
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
		super(router, apolloState, GLOBAL_DATA_CLIENT);
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
		super(router, apolloState, GLOBAL_CONSTANT_CLIENT);
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
		super(router, apolloState, ALL_USER_CLIENT);
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
		super(router, apolloState, USER_CLIENT);
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
		super(router, apolloState, TEAM_CLIENT);
	}

	redirect(status: ClientStatus) {
		switch (status) {
			case ClientStatus.ERROR:
				this.router.navigate(['server-issue']);
				break;
			case ClientStatus.NOT_READY:
				this.router.navigate(['user', 'pick-a-team']);
		}
	}
}



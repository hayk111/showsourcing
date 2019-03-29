import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap, switchMap, delay } from 'rxjs/operators';
import { ApolloStateService, ClientStatus } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { log, LogColor } from '~utils';
import { AuthenticationService } from '~core/auth/services/authentication.service';


export abstract class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected client: Client,
		protected authSrv: AuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

		return this.authSrv.isAuthenticated$.pipe(
			tap(d => { debugger; }),
			delay(100),
			switchMap(_ => this.apolloState.getClientStatus(this.client)),
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${this.client}, state: ${status}`, LogColor.GUARD)),
			filter(status => status !== ClientStatus.PENDING),
			tap(status => this.redirectOnError(status, route, state)),
			map(status => status === ClientStatus.READY),
		);
	}

	canActivateChild(route, state): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent, state);
	}

	protected checkStatus(status: ClientStatus) {
		// if (status === ClientStatus.NOT_READY) {
		// 	return this.initializer.init().pipe(
		// 	switchMap(_ => this.apolloState.getClientStatus())
		// );
		// } else {
		// 	return of(status);
		// }
	}


	protected redirectOnError(status: ClientStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (status === ClientStatus.ERROR) {
			this.router.navigate(['error', 'generic']);
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
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_DATA, authSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class GlobalConstClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_CONSTANT, authSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class AllUserClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.ALL_USER, authSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class UserClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.USER, authSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TeamClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.TEAM, authSrv);
	}

	protected redirectOnError(status: ClientStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (status === ClientStatus.ERROR) {
			this.router.navigate(['error', 'generic']);
		}
		if (status === ClientStatus.NOT_READY) {
			// we gotta check if there is a return url already,
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['user', 'pick-a-team'], { queryParams: { returnUrl } });
		}
	}
}




@Injectable({
	providedIn: 'root'
})
export class GlobalRequestClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected authSrv: AuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_REQUEST, authSrv);
	}
}

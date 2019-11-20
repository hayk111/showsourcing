import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { ApolloStateService, ClientStatus } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { RealmAuthenticationService } from '~core/auth/services/realm-authentication.service';
import { log, LogColor } from '~utils';


export abstract class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected client: Client,
		protected realmAuthSrv: RealmAuthenticationService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

		return this.realmAuthSrv.realmUser$.pipe(
			filter(user => !!user),
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
			// clearing local storage on error to clean incompatibilities
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
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_DATA, realmAuthSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class GlobalConstClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_CONSTANT, realmAuthSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class AllUserClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.ALL_USER, realmAuthSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class CentralClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.CENTRAL, realmAuthSrv);
	}
}

@Injectable({
	providedIn: 'root'
})
export class TeamClientReadyGuard extends ClientReadyGuard {
	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.TEAM, realmAuthSrv);
	}

	protected redirectOnError(status: ClientStatus, route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (status === ClientStatus.ERROR) {
			this.router.navigate(['error', 'generic']);
		}
		if (status === ClientStatus.NOT_READY) {
			// we gotta check if there is a return url already,
			const returnUrl = route.queryParams.returnUrl ? route.queryParams.returnUrl : state.url;
			this.router.navigate(['auth', 'user', 'pick-a-team'], { queryParams: { returnUrl } });
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
		protected realmAuthSrv: RealmAuthenticationService
	) {
		super(router, apolloState, Client.GLOBAL_REQUEST, realmAuthSrv);
	}
}

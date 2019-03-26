import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ApolloStateService, ClientStatus } from '~core/apollo';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { log, LogColor } from '~utils';


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
	) {
		super(router, apolloState, Client.GLOBAL_REQUEST);
	}
}

import { Injectable, InjectionToken, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService, State, ClientStatus } from '~shared/apollo';
import { Inject } from '@angular/core';
import {
	GLOBAL_CONSTANT_CLIENT, USER_CLIENT,
	GLOBAL_DATA_CLIENT, ALL_USER_CLIENT, TEAM_CLIENT
} from '~shared/apollo/services/apollo-client-names.const';


@Injectable({
	providedIn: 'root'
})
export abstract class ClientReadyGuard implements CanActivate, CanActivateChild {
	protected client: string;

	constructor(
		protected router: Router,
		protected apolloState: ApolloStateService,
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		return this.checkReady(this.client);
	}

	canActivateChild(route): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate(route.parent);
	}

	protected checkReady(client: string): Observable<boolean> {
		return this.apolloState.getClientStatus(client).pipe(
			filter(status => status !== ClientStatus.PENDING),
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${client}, state: ${status}`, LogColor.GUARD)),
			tap(status => this.redirect(status)),
			map(status => status === ClientStatus.READY)
		);
	}

	protected redirect(status: ClientStatus) {
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

export class GlobalDataClientReadyGuard extends ClientReadyGuard {
	client = GLOBAL_DATA_CLIENT;
}

export class GlobalConstClientReadyGuard extends ClientReadyGuard {
	client = GLOBAL_CONSTANT_CLIENT;
}

export class AllUserClientReadyGuard extends ClientReadyGuard {
	client = ALL_USER_CLIENT;
}

export class UserClientReadyGuard extends ClientReadyGuard {
	client = USER_CLIENT;
}

export class TeamClientReadyGuard extends ClientReadyGuard {
	client = TEAM_CLIENT;

	redirect(status: ClientStatus) {
		switch (status) {
			case ClientStatus.ERROR:
				this.router.navigate(['server-issue']);
				break;
			case ClientStatus.DESTROYED:
				this.router.navigate(['user', 'pick-a-team']);
		}
	}
}



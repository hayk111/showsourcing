import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { ApolloStateService, State, ClientStatus } from '~shared/apollo';
import { Inject } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ClientReadyGuard implements CanActivate, CanActivateChild {

	constructor(
		@Inject('clientName') private clientName: string,
		private apolloState: ApolloStateService,
		private router: Router
	) { }

	canActivate(): boolean | Observable<boolean> | Promise<boolean> {
		return this.apolloState.getClientStatus(this.clientName).pipe(
			tap(status => log.debug(`%c ClientsReadyGuard, client: ${this.clientName}, state: ${status}`, LogColor.GUARD)),
			tap(status => this.redirect(status)),
			map(status => status === ClientStatus.READY)
		);
	}

	redirect(status: ClientStatus) {
		switch (status) {
			case ClientStatus.DESTROYED:
			case ClientStatus.NOT_INITIALIZED:
				this.router.navigate(['guest', 'login']);
				break;
			case ClientStatus.ERROR:
				this.router.navigate(['server-issues']);
				break;
		}
	}


	canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
		return this.canActivate();
	}
}

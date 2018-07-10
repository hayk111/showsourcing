import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { log } from '~utils';

export interface ClientState {
	pending: boolean;
	ready: boolean;
}

/**
 * Used for no circular dependency between apollo.service and team service
 *
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloStateService {

	private _globalClientsReady$ = new ReplaySubject<ClientState>(1);
	globalClientsReady$ = this._globalClientsReady$.asObservable();

	private _userClientReady$ = new ReplaySubject<ClientState>(1);
	userClientReady$: Observable<ClientState> = this._userClientReady$.asObservable();

	private _teamClientReady$ = new ReplaySubject<ClientState>(1);
	teamClientReady$: Observable<ClientState> = this._teamClientReady$.asObservable();

	constructor() {
		this.globalClientsReady$.subscribe(d => this.log(`global client ready ? ${d}`));
		this.userClientReady$.subscribe(d => this.log(`user client ready ? ${d}`));
		this.teamClientReady$.subscribe(d => this.log(`team client ready ? ${d}`));
	}

	private log(str: string) {
		log.debug(`%c ApolloState: ${str}`, 'color: tomato');
	}


	setUserClientReady() {
		this._userClientReady$.next({ ready: true, pending: false });
	}

	setUserClientNotReady() {
		this._userClientReady$.next({ ready: false, pending: false });
	}

	resetUserClient() {
		this._userClientReady$.next({ ready: undefined, pending: true });
	}

	setTeamClientReady() {
		this._teamClientReady$.next({ ready: true, pending: false });
	}

	setTeamClientNotReady() {
		this._teamClientReady$.next({ ready: false, pending: false });
	}

	resetTeamClient() {
		this._teamClientReady$.next({ ready: undefined, pending: true });
	}

	setGlobalClientsReady() {
		this._globalClientsReady$.next({ ready: true, pending: false });
	}

	setGlobalClientsNotReady() {
		this._globalClientsReady$.next({ ready: false, pending: false });
	}

	resetGlobalClient() {
		this._globalClientsReady$.next({ ready: undefined, pending: true });
	}
}

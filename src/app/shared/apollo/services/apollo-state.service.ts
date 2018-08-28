import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { log } from '~utils';

export interface AllClientState {
	[key: string]: ClientState;
}

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

	private clientReady: AllClientState = {};
	private _clientsReady$ = new ReplaySubject<AllClientState>(1);
	clientsReady$ = this._clientsReady$.asObservable();


	setClientReady(name: string) {
		this.clientReady[name] = { ready: true, pending: false };
		this.log(name, true, false);
		this.emit();
	}

	setClientNotReady(name: string) {
		this.clientReady[name] = { ready: false, pending: false };
		this.log(name, false, false);
		this.emit();
	}

	resetClient(name: string) {
		this.clientReady[name] = { ready: false, pending: true };
		this.log(name, false, true);
		this.emit();
	}

	private emit() {
		this._clientsReady$.next(this.clientReady);
	}

	private log(str: string, ready: boolean, pending: boolean) {
		log.debug(`%c Apollo Client State: ${str} client, ready: ${ready}, pending: ${pending}`, 'color: tomato');
	}

}

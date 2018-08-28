import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { log } from '~utils';

export interface AllClientState {
	[key: string]: State;
}

export interface State {
	clientState: ClientState;
	error?: any;
}

export enum ClientState {
	NOT_INITIALIZED = 'not initialized',
	DESTROYED = 'destroyed, Brrrr BOOOM',
	READY = 'ready',
	ERROR = 'error'
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
		const state = { clientState: ClientState.READY };
		this.clientReady[name] = state;
		this.log(name, state);
		this.emit();
	}

	setClientError(name: string) {
		const state = { clientState: ClientState.ERROR };
		this.clientReady[name] = state;
		this.log(name, state);
		this.emit();
	}

	destroyClient(name: string) {
		const state = { clientState: ClientState.DESTROYED };
		this.clientReady[name] = state;
		this.log(name, state);
		this.emit();
	}

	private emit() {
		this._clientsReady$.next(this.clientReady);
	}

	private log(str: string, state: State) {
		log.debug(`%c Apollo Client State: ${str} client, state: ${state.clientState}, error: ${state.error || 'none'}`);
	}

}

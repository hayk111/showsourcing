import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, tap, map, distinctUntilChanged } from 'rxjs/operators';
import { log, LogColor } from '~utils';

export interface AllClientState {
	[key: string]: ClientStatus;
}


export enum ClientStatus {

	// at the start, when we don't know yet
	PENDING = 'pending',
	// it is ready
	READY = 'ready',
	// not ready for a reason that is not an error
	// (eg: user has no team, therefor we can't start team client)
	NOT_READY = 'not ready',
	// an error has been thrown during the connection process
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
	private clientsReady$ = this._clientsReady$.asObservable();

	getClientStatus(name: string): Observable<ClientStatus> {
		return this.clientsReady$.pipe(
			map(state => state[name] ? state[name] : ClientStatus.PENDING),
			distinctUntilChanged()
		);
	}

	setClientStatus(name: string, status: ClientStatus) {
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}


	setClientReady(name: string) {
		const status = ClientStatus.READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	setClientError(name: string) {
		const status = ClientStatus.ERROR;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	setClientPending(name: string) {
		const status = ClientStatus.PENDING;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	destroyClient(name: string) {
		const status = ClientStatus.NOT_READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	private getCurrentStatus(clientName: string): ClientStatus {
		return this.clientReady[clientName] || ClientStatus.PENDING;
	}


	private emit() {
		this._clientsReady$.next(this.clientReady);
	}

	private log(name: string, newStatus: ClientStatus, oldStatus: ClientStatus) {
		log.debug(`%c Apollo Client State: ${name} client, new State: ${newStatus},`
			+ ` old State: ${oldStatus}`, 'color: tomato');
	}

}

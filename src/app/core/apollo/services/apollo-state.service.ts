import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, of } from 'rxjs';
import { filter, tap, map, distinctUntilChanged, shareReplay, first, mapTo, switchMap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { Router } from '@angular/router';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { Apollo, ApolloBase } from 'apollo-angular';
import { showsourcing } from '~utils/debug-object.utils';

export interface AllClientState {
	[client: string]: ClientStatus;
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

	private clientsState: AllClientState = {};
	private _clientsState$ = new ReplaySubject<AllClientState>(1);
	private clientsState$ = this._clientsState$.asObservable().pipe(
		shareReplay(1)
	);

	constructor(protected router: Router, public apollo: Apollo) {
		// for debugging
		this.clientsState$.subscribe(all => {
			showsourcing.clientsState = all;
		});
	}

	getClientStatus(name: Client): Observable<ClientStatus> {
		return this.clientsState$.pipe(
			map(state => state[name] ? state[name] : ClientStatus.PENDING),
			distinctUntilChanged()
		);
	}

	setClientStatus(name: Client, status: ClientStatus) {
		this.log(name, status, this.getCurrentStatus(name));
		this.clientsState[name] = status;
		this.emit();
	}

	setClientReady(name: Client) {
		const status = ClientStatus.READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientsState[name] = status;
		this.emit();
	}

	setClientError(name: Client, error: Error) {
		const status = ClientStatus.ERROR;
		this.log(name, status, this.getCurrentStatus(name));
		log.error(error);
		this.clientsState[name] = status;
		this.emit();
	}

	setClientPending(name: Client) {
		const status = ClientStatus.PENDING;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientsState[name] = status;
		this.emit();
	}

	destroyClient(name: Client) {
		const status = ClientStatus.NOT_READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientsState[name] = status;
		this.emit();
	}

	getClientWhenReady(name: Client, context: string): Observable<ApolloBase> {
		return this.getClientStatus(name).pipe(
			tap(status => {
				if (status !== ClientStatus.READY) {
					log.debug(`🕞About to use client ${name}, but it's not ready, so I'll wait.. context: ${context}`);
				}
			}),
			filter(status => status === ClientStatus.READY),
			first(),
			map(_ => this.apollo.use(name))
		);
	}

	getClient(name: Client) {
		return this.apollo.use(name);
	}

	private getCurrentStatus(clientName: string): ClientStatus {
		return this.clientsState[clientName] || ClientStatus.PENDING;
	}


	private emit() {
		this._clientsState$.next(this.clientsState);
	}

	private log(name: string, newStatus: ClientStatus, oldStatus: ClientStatus) {
		log.debug(`%c Apollo Client State: ${name} client, new State: ${newStatus},`
			+ ` old State: ${oldStatus}`, 'color: tomato');
	}

}

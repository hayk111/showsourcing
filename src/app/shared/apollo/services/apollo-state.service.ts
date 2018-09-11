import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, of } from 'rxjs';
import { filter, tap, map, distinctUntilChanged, shareReplay, first, mapTo, switchMap } from 'rxjs/operators';
import { log, LogColor } from '~utils';
import { Router } from '@angular/router';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { Apollo, ApolloBase } from 'apollo-angular';

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

	private clientReady: AllClientState = {};
	private _clientsReady$ = new ReplaySubject<AllClientState>(1);
	private clientsReady$ = this._clientsReady$.asObservable().pipe(
		shareReplay(1)
	);

	constructor(protected router: Router, public apollo: Apollo) {
		this.clientsReady$.subscribe(all => this.redirect(all));
	}

	getClientStatus(name: Client): Observable<ClientStatus> {
		return this.clientsReady$.pipe(
			map(state => state[name] ? state[name] : ClientStatus.PENDING),
			distinctUntilChanged()
		);
	}

	setClientStatus(name: Client, status: ClientStatus) {
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	setClientReady(name: Client) {
		const status = ClientStatus.READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	setClientError(name: Client) {
		const status = ClientStatus.ERROR;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	setClientPending(name: Client) {
		const status = ClientStatus.PENDING;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	destroyClient(name: Client) {
		const status = ClientStatus.NOT_READY;
		this.log(name, status, this.getCurrentStatus(name));
		this.clientReady[name] = status;
		this.emit();
	}

	getClientWhenReady(name: Client): Observable<ApolloBase> {
		return this.getClientStatus(name).pipe(
			tap(status => {
				if (status !== ClientStatus.READY)
					log.debug(`About to use client ${name}, but it's not ready, so I'll wait`);
			}),
			filter(status => status === ClientStatus.READY),
			first(),
			map(_ => this.apollo.use(name))
		);
	}

	private redirect(allState: AllClientState) {
		// when any of those has error, we redirect to server issue
		const hasError = Object.values(allState).some(value => value === ClientStatus.ERROR);
		if (hasError) {
			this.router.navigate(['server-issue']);
			return;
		}
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

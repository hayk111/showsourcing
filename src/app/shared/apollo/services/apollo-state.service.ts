import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Log } from '~utils/logger/log.class';



/**
 * Used for no circular dependency between apollo.service and team service
 *
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloStateService {

	private _globalClientsReady$ = new ReplaySubject<boolean>(1);
	globalClientsReady$ = this._globalClientsReady$.asObservable();

	private _userClientReady$ = new ReplaySubject<boolean>(1);
	userClientReady$: Observable<boolean> = this._userClientReady$.asObservable();

	private _teamClientReady$ = new ReplaySubject<boolean>(1);
	teamClientReady$: Observable<boolean> = this._teamClientReady$.asObservable();

	constructor() {
		this.globalClientsReady$.subscribe(d => this.log(`global client ready ? ${d}`));
		this.userClientReady$.subscribe(d => this.log(`user client ready ? ${d}`));
		this.teamClientReady$.subscribe(d => this.log(`team client ready ? ${d}`));
	}

	private log(str: string) {
		log.debug(`%c ApolloState: ${str}`, 'color: tomato');
	}


	setUserClientReady() {
		this._userClientReady$.next(true);
	}

	setUserClientNotReady() {
		this._userClientReady$.next(false);
	}

	setTeamClientReady() {
		this._teamClientReady$.next(true);
	}

	setTeamClientNotReady() {
		this._teamClientReady$.next(false);
	}

	setGlobalClientsReady() {
		this._globalClientsReady$.next(true);
	}

	setGlobalClientsNotReady() {
		this._globalClientsReady$.next(false);
	}


}

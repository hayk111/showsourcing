import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



/**
 * Used for no circular dependency between apollo.service and team service
 */
@Injectable({
	providedIn: 'root'
})
export class ApolloStateService {

	private _teamClientReady$ = new BehaviorSubject<boolean>(null);
	teamClientReady$: Observable<boolean> = this._teamClientReady$.asObservable();

	private _userClientReady$ = new BehaviorSubject<boolean>(null);
	userClientReady$: Observable<boolean> = this._userClientReady$.asObservable();


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


}

import { Observable, of, BehaviorSubject, concat } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, first, take } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ApiClient } from 'showsourcing-frontend-api';
import * as localforage from 'localforage';

// client.sync();
// export const db = client.db;
// db.get('Product', 'some-id').subscribe(product => console.log(product));
// db.find('Product').data$.subscribe(products => console.log(products));
// client.Auth.signIn('augustin@showsourcing.com', 'Test1234').then(_ => {
//   client.synchronizer.sync();
// });

type ApiLibState = 'not-sync' | 'syncing' | 'synced';
const teamId = '14fd7963-0437-4821-80fc-01f74bb78a95'; // hardcoded team id - to be removed

@Injectable({providedIn: 'root'})
export class ApiLibService {
	private _apiClient: ApiClient;
	private _ready: ApiLibState;
	ready = new BehaviorSubject<ApiLibState>('not-sync');

	init() {
		localforage.config({
			driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
			name: 'apiLib',
			version: 1.0,
			// size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
			storeName: 'appsync', // Should be alphanumeric, with underscores.
			description:
				'entities stored locally with apollo appsync for the showsourcing app',
		});

		this._apiClient = new ApiClient({
			offlineConfig: {storage: localforage},
			shouldSync: true,
		});

		this._apiClient.sync(teamId);
		this._apiClient.state.sync$.subscribe(ready => {
			console.log('ApiLibService -> init -> ready', ready);
			this._ready = ready;
			this.ready.next(ready);
		});
	}

	/**
	 * Fetches all the entities
	 * @returns Promise
	 */
	async sync(teamId: string): Promise<any> {
		// if (!UserService.userId) {
		// 	throw Error(`Only authorized users can sync`);
		// }

		return this._apiClient.sync(teamId);
	}

	get db() {
		return this._apiClient.srv.db;
	}

	get apiClient() {
		return this._apiClient;
	}

	get ready$(): Observable<ApiLibState> {
		return this._apiClient.state.sync$;
	}
}

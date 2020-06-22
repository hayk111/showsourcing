import { Observable, of, BehaviorSubject, concat } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, first, take } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { ApiClient } from 'showsourcing-frontend-api';
import * as localforage from 'localforage';
import { updateProduct, createProduct } from '../../../graphql/mutations';
import gql from 'graphql-tag';

// client.sync();
// export const db = client.db;
// db.get('Product', 'some-id').subscribe(product => console.log(product));
// db.find('Product').data$.subscribe(products => console.log(products));
// client.Auth.signIn('augustin@showsourcing.com', 'Test1234').then(_ => {
//   client.synchronizer.sync();
// });

const syncProducts =  `
	query SyncProducts(
		$teamId: ID
		$limit: Int
		$nextToken: String
		$lastSync: AWSTimestamp
	) {
		syncProducts(
			teamId: $teamId
			limit: $limit
			nextToken: $nextToken
			lastSync: $lastSync
		) {
			items {
				id
				name
				properties { name value }
				teamId
			}
			startedAt
		}
	}
`;

@Injectable({providedIn: 'root'})
export class ApiLibService {
	private _apiClient: any;
	private _ready = false;

	init() {
		const isOnline$ = new BehaviorSubject(navigator.onLine);
		window.addEventListener('online', () => isOnline$.next(true));
		window.addEventListener('offline', () => isOnline$.next(false));

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
			isOnline$,
			shouldSync: true,
		});
		console.log('ApiLibService -> init -> this._apiClient', this._apiClient);
		this._apiClient._ready$.subscribe(ready => {
			console.log('ApiLibService -> init -> this._ready', this._ready);
			this._ready = ready;
		});

		// .subscribe(ready => this._ready = ready);
		// this._apiClient.ready$
		// 	.subscribe(async ready => {
		// 		try {
		// 			await this._apiClient.sync();
		// 		} catch (e) {
		// 			console.log('ApiLibService -> init -> err', e);
		// 		}
		// 		this._ready = ready;
		// 	});
	}

	/**
	 * Fetches all the entities
	 * @returns Promise
	 */
	async sync(teamId: string): Promise<any> {
		// if (!UserService.userId) {
		// 	throw Error(`Only authorized users can sync`);
		// }

		return this._apiClient.srv.synchronizer.sync(teamId);
	}

	get db() {
		return this._apiClient.srv.db;
	}

	get apiClient() {
		return this._apiClient;
	}

	get ready$(): Observable<boolean> {
		return this._apiClient.state.ready$;
	}
}

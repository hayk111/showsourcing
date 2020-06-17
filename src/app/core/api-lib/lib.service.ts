import { Observable, of, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ApiClient } from 'showsourcing-frontend-api';
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
	private _apiClient: ApiClient;
	private _ready = false;

	init(teamId: string) {
		this._apiClient = new ApiClient({
			awsExport: environment.awsConfig,
			isOnline$: new BehaviorSubject(true),
			mutationMap: {
				Product: { update: gql(updateProduct), create: gql(createProduct) }
			},
			syncMap: {
				Product: {
					syncable: true,
					base: {
						limitPaginate: 10,
						query: gql(syncProducts),
						__typename: 'ModelProductConnection',
						variables: { teamId },
					}
				}
			}
		});

		this._apiClient.ready$.subscribe(ready => this._ready = ready);
	}

	/**
	 * Fetches all the entities
	 * @returns Promise
	 */
	async sync(): Promise<any> {
		// if (!UserService.userId) {
		// 	throw Error(`Only authorized users can sync`);
		// }

		if (!this._ready) {
			throw Error(`The client isn't ready, wait for it to be ready with ready$`);
		}
		return this._apiClient.synchronizer.sync();
	}

	get db() {
		if (!this._ready) {
			throw Error(`The client isn't ready, wait for it to be ready with ready$`);
		}
		return this._apiClient.db;
	}

	get apiClient() {
		return this._apiClient;
	}

	get ready$(): Observable<boolean> {
		return this._apiClient.ready$;
	}
}

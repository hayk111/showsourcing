import { Injectable } from '@angular/core';
import idb from 'pouchdb-adapter-idb';
import RxDB, { RxDatabase } from 'rxdb';

@Injectable()
export class DbService {
	db: any;

	constructor() {
		RxDB.plugin(idb);
	}

	async start() {
		this.db = await RxDB.create({
			name: 'showsourcing',           // <- name
			adapter: 'idb',          // <- storage-adapter
			// password: 'myPassword',     // <- password (optional)
			multiInstance: true         // <- multiInstance (default: true)
		});
		// window['db'] = this.db;
	}

}

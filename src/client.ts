import { client, state } from 'lib';
import * as localforage from 'localforage';
import { filter } from 'rxjs/operators';

localforage.config({
	driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
	name: 'apiLib',
	version: 1.0,
	// size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
	storeName: 'appsync', // Should be alphanumeric, with underscores.
	description:
		'entities stored locally with apollo appsync for the showsourcing app',
});

client.init({
	offlineConfig: {storage: localforage},
	shouldSync: true,
});


state.auth$.pipe(
	filter(state => state === 'AUTHENTICATED')
).subscribe(_ => client.sync('14fd7963-0437-4821-80fc-01f74bb78a95'));

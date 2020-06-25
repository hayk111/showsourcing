import { client } from 'lib';
import * as localforage from 'localforage';

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

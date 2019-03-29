import { SUPPLIER_WEB_VERSION } from 'environments/global.const';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { LogLevel } from '~utils';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	version: SUPPLIER_WEB_VERSION,
	production: false,
	graphqlUrl: 'wss://showsourcingdev.us1a.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingdev.us1a.cloud.realm.io/auth',
	apiUrl: 'https://services-dev.showsourcing.com',
	getStreamKey: 'aner534ygtg9',
	mixPanelKey: '9143fc0c3d674a93d201e8d9e12fb4f9',
	hubspotKey: '5511311',
	LOG_LEVEL: LogLevel.DEBUG,
	defaultClient: Client.GLOBAL_REQUEST
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

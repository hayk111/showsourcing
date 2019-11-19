import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';
import { Client } from '~core/apollo/services/apollo-client-names.const';

export const environment = {
	version: WEB_VERSION + '-DEV',
	production: false,
	hmr: true,
	graphqlUrl: 'wss://showsourcingdev.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingdev.us1.cloud.realm.io/auth',
	apiUrl: 'https://services-dev.showsourcing.com',
	getStreamKey: 'aner534ygtg9',
	getStreamAppID: '46893',
	mixPanelKey: '9143fc0c3d674a93d201e8d9e12fb4f9',
	hubspotKey: '5511311',
	LOG_LEVEL: LogLevel.DEBUG,
	defaultClient: Client.TEAM
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.

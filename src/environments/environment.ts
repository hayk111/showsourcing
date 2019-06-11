import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';
import { Client } from '~core/apollo/services/apollo-client-names.const';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// TODO: we should add a log config like:
// config = {
//   guards: true,
//   components: false,
//   entitySrv: true,
//   showSubscriptions: false,
//   routing: false
// }
// so we can have more fine grained logs

export const environment = {
	version: WEB_VERSION,
	production: false,
	graphqlUrl: 'wss://showsourcingdev.us1a.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingdev.us1a.cloud.realm.io/auth',
	apiUrl: 'https://services-dev.showsourcing.com',
	getStreamKey: 'aner534ygtg9',
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

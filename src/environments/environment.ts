import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


export const environment = {
	version: WEB_VERSION,
	production: false,
	graphqlUrl: 'wss://showsourcingprod.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingprod.us1.cloud.realm.io/auth',
	apiUrl: 'https://services.showsourcing.com',
	getStreamKey: 'aner534ygtg9',
	mixPanelKey: '9143fc0c3d674a93d201e8d9e12fb4f9',
	hubspotKey: '5511311',
	LOG_LEVEL: LogLevel.DEBUG
};



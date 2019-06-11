import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';
import { Client } from '~core/apollo/services/apollo-client-names.const';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: true,
	version: WEB_VERSION,
	graphqlUrl: 'wss://showsourcingdev.us1a.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingdev.us1a.cloud.realm.io/auth',
	apiUrl: 'https://services-dev.showsourcing.com',
	mixPanelKey: 'fd1633b6288f31d3d7e4554c1c4f5e44',
	hubspotKey: '2134370',
	getStreamKey: 'kn8zj3tgdkf3',
	LOG_LEVEL: LogLevel.DEBUG,
	defaultClient: Client.TEAM
};

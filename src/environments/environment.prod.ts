import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';



export const environment = {
	production: true,
	staging: false,
	version: WEB_VERSION,
	graphqlUrl: 'wss://showsourcingprod.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingprod.us1.cloud.realm.io/auth',
	apiUrl: 'https://services.showsourcing.com',
	getStreamKey: 'kn8zj3tgdkf3',
	LOG_LEVEL: LogLevel.ERROR,
};


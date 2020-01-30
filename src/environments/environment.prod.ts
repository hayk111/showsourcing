import { LogLevel } from '~utils/logger/log-level';
import { WEB_VERSION } from './global.const';




export const environment = {
	production: true,
	hmr: false,
	version: WEB_VERSION,
	graphqlUrl: 'wss://showsourcingprod.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingprod.us1.cloud.realm.io/auth',
	apiUrl: 'https://services.showsourcing.com',
	mixPanelKey: 'b59449e8af12d91ac73a9aa92b1a29a7',
	hubspotKey: '2134370',
	getStreamKey: 'kn8zj3tgdkf3',
	getStreamAppID: '39385',
	LOG_LEVEL: LogLevel.ERROR,
};


import { SUPPLIER_WEB_VERSION } from 'environments/global.const';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { LogLevel } from '~utils';

export const environment = {
	production: true,
	version: SUPPLIER_WEB_VERSION,
	graphqlUrl: 'wss://showsourcingprod.us1.cloud.realm.io/graphql',
	graphqlAuthUrl: 'https://showsourcingprod.us1.cloud.realm.io/auth',
	apiUrl: 'https://services.showsourcing.com',
	mixPanelKey: 'fd1633b6288f31d3d7e4554c1c4f5e44',
	hubspotKey: '2134370',
	getStreamKey: 'kn8zj3tgdkf3',
	LOG_LEVEL: LogLevel.ERROR,
	defaultClient: Client.GLOBAL_REQUEST
};

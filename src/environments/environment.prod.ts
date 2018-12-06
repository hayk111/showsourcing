import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	version: '0.0.1',
	graphqlUrl: 'wss://ros-dev3.showsourcing.com:9443/graphql',
	apiUrl: 'https://ros-dev3.showsourcing.com',
	getStreamKey: '7mxs7fsf47nu',
	LOG_LEVEL: LogLevel.ERROR,
};


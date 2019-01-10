import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	staging: false,
	version: '0.0.2',
	graphqlUrl: 'wss://ros-dev3.showsourcing.com/graphql',
	apiUrl: 'https://ros-dev3.showsourcing.com',
	getStreamKey: '7mxs7fsf47nu',
	LOG_LEVEL: LogLevel.ERROR,
};


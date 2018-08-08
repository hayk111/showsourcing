import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	graphqlUrl: 'ws://ros-dev3.showsourcing.com:9443/graphql',
	apiUrl: 'https://ros-dev3.showsourcing.com:9443',
	LOG_LEVEL: LogLevel.ERROR,
};


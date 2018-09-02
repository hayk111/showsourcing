import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	graphqlUrl: 'wss://ros-dev3.showsourcing.com:9443/graphql',
	realmUrl: 'https://ros-dev3.showsourcing.com:9443',
	apiUrl: 'https://ros-dev3.showsourcing.com',
	LOG_LEVEL: LogLevel.ERROR,
};


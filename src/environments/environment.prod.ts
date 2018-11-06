import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	graphqlUrl: 'wss://ros-dev2.showsourcing.com:9443/graphql',
	realmUrl: 'https://ros-dev2.showsourcing.com:9443',
	apiUrl: 'https://ros-dev2.showsourcing.com',
	getStreamKey: 'mvufdhfnfz83',
	LOG_LEVEL: LogLevel.ERROR,
};


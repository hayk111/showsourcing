import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: true,
	graphqlUrl: 'wss://ros-dev3.showsourcing.com:9443/graphql',
	apiUrl: 'https://ros-dev3.showsourcing.com',
	signupUrl: 'https://ros-dev2-b.showsourcing.com/signup',
	LOG_LEVEL: LogLevel.ERROR,
};


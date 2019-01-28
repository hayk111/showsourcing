import { LogLevel } from '~utils/logger/log-level';

export const environment = {
	production: false,
	staging: false,
	graphqlUrl: 'ws://localhost:9080/graphql',
	graphqlAuthUrl: 'http://localhost/auth',
	apiUrl: 'http://localhost',
	LOG_LEVEL: LogLevel.DEBUG,
};

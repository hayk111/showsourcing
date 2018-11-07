import { LogLevel } from '~utils/logger/log-level';
//

export const environment = {
	production: false,
	graphqlUrl: 'ws://localhost:9080/graphql',
	realmUrl: 'http://localhost:9080',
	apiUrl: 'http://localhost',
	LOG_LEVEL: LogLevel.DEBUG,
};


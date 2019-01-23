import { LogLevel } from '~utils/logger/log-level';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	version: '0.0.3',
	production: false,
	staging: true,
	graphqlUrl: 'wss://ros-sta.showsourcing.com/graphql',
	graphqlAuthUrl: 'https://ros-sta.showsourcing.com/auth',
	apiUrl: 'https://ros-sta.showsourcing.com',
	getStreamKey: '7mxs7fsf47nu',
	LOG_LEVEL: LogLevel.DEBUG
};

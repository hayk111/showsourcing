import { LogLevels } from '~utils/logger/log-levels';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	apiUrl: 'http://ros-dev2.showsourcing.com:9080',
	signupUrl: 'https://ros-dev2.showsourcing.com/signup',
	LOG_LEVEL: LogLevels.DEBUG,
};

import { LogLevels } from '~utils/logger/log-levels';

export const environment = {
	production: true,
	// TODO unneeded anymore ?
	apiUrl: 'http://ros-dev.showsourcing.com:9080',
	LOG_LEVEL: LogLevels.ERROR,
};


import { LogLevels } from '~utils/logger/log-levels';

export const environment = {
	production: true,
	// TODO unneeded anymore ?
	apiUrl: 'http://vps540915.ovh.net:9080',
	LOG_LEVEL: LogLevels.ERROR,
};

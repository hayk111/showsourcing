import { LogLevels } from '~utils/logger/log-levels';

export const environment = {
	production: true,
	// TODO unneeded anymore ?
	apiUrl: 'https://vps540915.ovh.net:9080',
	LOG_LEVEL: LogLevels.ERROR,
};

import { LogLevels } from '~utils/logger/log-levels';

export const environment = {
	production: true,
	// TODO unneeded anymore ?
	apiUrl: 'https://stoemelings.showsourcing.com',
	LOG_LEVEL: LogLevels.ERROR,
};

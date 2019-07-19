import { environment } from 'environments/environment';
import { Log } from '~utils/logger/log.class';
import { LogLevel } from './logger';

// using an instance so the logger can be used in other projects
const urlParams = new URLSearchParams(window.location.search);
const logLevelUrl = (urlParams.get('LOG_LEVEL') || '').toUpperCase();
let logLevel: LogLevel ;

switch (logLevelUrl) {
	case 'DEBUG':
		logLevel = LogLevel.DEBUG; break;
	case 'INFO':
		logLevel = LogLevel.INFO; break;
	case 'WARN':
		logLevel = LogLevel.WARN; break;
	case 'ERROR':
		logLevel = LogLevel.ERROR; break;
	default: logLevel = environment.LOG_LEVEL;
}
export const log = new Log(logLevel);

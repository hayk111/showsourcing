import { LogLevels } from './log-levels';
import { environment } from '../../../environments/environment';


const LOG_LEVEL: LogLevels = environment.LOG_LEVEL;

export default class Log {

	static info(...args) {
		if (LOG_LEVEL >= LogLevels.INFO)
			console.info(...args);
	}

	static debug(...args) {
		if (LOG_LEVEL >= LogLevels.DEBUG)
			console.debug(...args);
	}

	static error(...args) {
		if (LOG_LEVEL >= LogLevels.ERROR)
			console.error(...args);
	}

	static warn(...args) {
		if (LOG_LEVEL >= LogLevels.WARN)
			console.warn(...args);
	}
}

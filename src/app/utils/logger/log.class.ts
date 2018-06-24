import { LogLevel } from './log-level';


export class Log {

	constructor(public level: LogLevel = LogLevel.DEBUG) { }
	info(...args) {
		if (this.level >= LogLevel.INFO)
			console.info(...args);
	}

	debug(...args) {
		if (this.level >= LogLevel.DEBUG)
			console.debug(...args);
	}

	error(...args) {
		if (this.level >= LogLevel.ERROR)
			console.error(...args);
	}

	warn(...args) {
		if (this.level >= LogLevel.WARN)
			console.warn(...args);
	}

	// TODO implement group and table
}

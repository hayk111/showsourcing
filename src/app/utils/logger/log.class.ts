import { LogLevel } from './log-level';


export class Log {

	constructor(
		public level: LogLevel = LogLevel.DEBUG,
	) { }

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

	group(...args) {
		if (this.level >= LogLevel.DEBUG) {
			console.groupCollapsed(...args);
		}
	}

	groupEnd() {
		if (this.level >= LogLevel.DEBUG) {
			console.groupEnd();
		}

	}

	/** displays a nicely formated table */
	table(obj: any, ...args) {
		if (this.level >= LogLevel.DEBUG) {
			console.table(obj, ...args);
		}
	}

	/** displays a stack trace from where this function was called */
	trace() {
		if (this.level >= LogLevel.DEBUG) {
			console.trace();
		}
	}

	/** count the number of times we go through this count */
	count(label: string) {
		if (this.level >= LogLevel.DEBUG) {
			console.count(label);
		}
	}
}

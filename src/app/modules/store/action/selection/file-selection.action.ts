import { AppFile } from '../../model/entities/app-file.model';

export enum ActionType {
	LOAD = '[FileSelection] loading',
	ADD = '[FileSelection] adding',
	REMOVE = '[FileSelection] removing',
	RESET = '[FileSelection] resetting',
	CREATE = '[FileSelection] creating',
	REPLACE = '[FileSelection] replacing',
	DOWNLOAD = '[FileSelection] downloading'
}

export class FileSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static create(file: AppFile) {
		return {
			type: ActionType.CREATE,
			payload: file
		};
	}

	static replace(old: AppFile, replacing: AppFile) {
	  return {
	    type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(files: Array<AppFile>) {
		return {
			type: ActionType.ADD,
			payload: files
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
		};
	}

	static download(file: AppFile) {
		return {
			type: ActionType.DOWNLOAD,
			payload: file
		};
	}

	static remove(file: AppFile) {
		return {
			type: ActionType.REMOVE,
			payload: file
		};
	}
}

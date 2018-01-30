import { AppFile } from '../../model/entities/app-file.model';

export enum ActionType {
	LOAD = '[FileSelection] loading',
	SET = '[FileSelection] setting',
	ADD = '[FileSelection] adding',
	REMOVE = '[FileSelection] removing',
	REPLACE = '[FileSelection] replacing',
	DOWNLOAD = '[FileSelection] downloading'
}

export class FileSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static set(files: Array<AppFile>) {
		return {
			type: ActionType.SET,
			payload: files
		};
	}

	static replace(old: AppFile, replacing: AppFile) {
	  return {
	    type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(file: AppFile) {
		return {
			type: ActionType.ADD,
			payload: file
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

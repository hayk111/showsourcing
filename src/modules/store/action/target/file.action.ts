import { AppFile } from '../../model/entities/app-file.model';

export enum ActionType {
	LOAD = '[FileTarget] loading',
	SET = '[FileTarget] setting',
	ADD = '[FileTarget] adding',
	REMOVE = '[FileTarget] removing',
	REPLACE = '[FileTarget] replacing',
	DOWNLOAD = '[FileTarget] downloading'
}

export class FileTargetActions {
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

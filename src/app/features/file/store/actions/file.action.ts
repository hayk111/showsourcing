import { AppFile } from '../../models';

export enum FileActionType {
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
			type: FileActionType.LOAD
		};
	}

	static set(files: Array<AppFile>) {
		return {
			type: FileActionType.SET,
			payload: files
		};
	}

	static replace(old: AppFile, replacing: AppFile) {
		return {
			type: FileActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(file: AppFile) {
		return {
			type: FileActionType.ADD,
			payload: file
		};
	}

	static download(file: AppFile) {
		return {
			type: FileActionType.DOWNLOAD,
			payload: file
		};
	}

	static remove(file: AppFile) {
		return {
			type: FileActionType.REMOVE,
			payload: file
		};
	}
}

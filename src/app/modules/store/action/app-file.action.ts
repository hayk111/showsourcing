import { EntityTarget } from '../utils/entities.utils';
import { AppFile } from '../model/app-file.model';



export enum ActionType {
	LOAD = '[File] Loading files for entity',
	SET = '[File] Setting files for entity (keeping pendings)',
	ADD_NEW = '[File] Adding new file',
	ADD_PENDING = '[File] Add pending',
	SET_READY = '[File] Set ready',
}

export class FileActions {
	static load(target: EntityTarget) {
		return {
			type: ActionType.LOAD,
			payload: target
		};
	}

	static add(files: Array<AppFile>) {
		return {
			type: ActionType.SET,
			payload: files
		};
	}

	static addNew(file: AppFile) {
		return {
			type: ActionType.ADD_NEW,
			payload: file
		};
	}

	static addPending(file: AppFile) {
		return {
			type: ActionType.ADD_PENDING,
			payload: file
		};
	}

	static setReady(id: string, replacing: AppFile) {
		return {
			type: ActionType.SET_READY,
			payload: { id, replacing }
		};
	}
}

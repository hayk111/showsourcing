import { EntityTarget } from '../utils/entities.utils';
import { AppFile } from '../model/app-file.model';
import { AppImage } from '../model/app-image.model';


export enum ActionType {
	LOAD = '[Image] Loading files for entity',
	SET = '[Image] Setting files for entity (keeping pendings)',
	ADD_NEW = '[Image] Adding new file',
	ADD_PENDING = '[Image] Add pending',
	SET_READY = '[Image] Set ready',
	REPORT_PROGRESS = '[Image] Reporting progress',
	ROTATE = '[Image] rotate',
	SET_IMG = '[Image] setting',
	DOWNLOAD = '[Image] download',
	DELETE = '[Image] delete'
}

export class ImageActions {
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

	static reportProgress(file: AppFile, progress: number) {
		return {
			type: ActionType.REPORT_PROGRESS,
			payload: { id: file.id, progress }
		};
	}

	static rotate(img: AppImage) {
		return {
			type: ActionType.ROTATE,
			payload: img
		};
	}

	static download(img: AppImage) {
		return {
			type: ActionType.DOWNLOAD,
			payload: img
		};
	}

	static delete(img: AppImage) {
		return {
			type: ActionType.DELETE,
			payload: img,
		};
	}

	static setImage(img: AppImage) {
		return {
			type: ActionType.SET_IMG,
			payload: img
		};
	}
}

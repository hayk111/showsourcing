import { AppImage } from '../../model/entities/app-image.model';

export enum ActionType {
	LOAD = '[ImageTarget] loading',
	SET = '[ImageTarget] setting',
	ADD = '[ImageTarget] adding',
	REMOVE = '[ImageTarget] removing',
	REPLACE = '[ImageTarget] replacing',
	DOWNLOAD = '[ImageTarget] downloading',
	ROTATE = '[ImageTarget] rotate',
}

export class ImageTargetActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}


	static replace(old: AppImage, replacing: AppImage) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(img: AppImage) {
		return {
			type: ActionType.ADD,
			payload: img
		};
	}

	static set(imgs: Array<AppImage>) {
		return {
			type: ActionType.SET,
			payload: imgs
		};
	}


	static remove(img: AppImage) {
		return {
			type: ActionType.REMOVE,
			payload: img
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
}

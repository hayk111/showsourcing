import { AppImage } from '../../models';

export enum ImageActionType {
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
			type: ImageActionType.LOAD
		};
	}


	static replace(old: AppImage, replacing: AppImage) {
		return {
			type: ImageActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(img: AppImage) {
		return {
			type: ImageActionType.ADD,
			payload: img
		};
	}

	static set(imgs: Array<AppImage>) {
		return {
			type: ImageActionType.SET,
			payload: imgs
		};
	}


	static remove(img: AppImage) {
		return {
			type: ImageActionType.REMOVE,
			payload: img
		};
	}

	static rotate(img: AppImage) {
		return {
			type: ImageActionType.ROTATE,
			payload: img
		};
	}

	static download(img: AppImage) {
		return {
			type: ImageActionType.DOWNLOAD,
			payload: img
		};
	}
}

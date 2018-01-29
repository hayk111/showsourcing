import { AppImage } from '../../model/entities/app-image.model';

export enum ActionType {
	LOAD = '[ImageSelection] loading',
	ADD = '[ImageSelection] adding',
	REMOVE = '[ImageSelection] removing',
	RESET = '[ImageSelection] resetting',
	CREATE = '[ImageSelection] creating',
	REPLACE = '[ImageSelection] replacing',
	DOWNLOAD = '[ImageSelection] downloading',
	ROTATE = '[ImageSelection] rotate',
}

export class ImageSlctnActions {
	static load() {
		return {
			type: ActionType.LOAD
		};
	}

	static create(img: AppImage) {
		return {
			type: ActionType.CREATE,
			payload: img
		};
	}

	static replace(old: AppImage, replacing: AppImage) {
		return {
			type: ActionType.REPLACE,
			payload: { old, replacing }
		};
	}

	static add(imgs: Array<AppImage>) {
		return {
			type: ActionType.ADD,
			payload: imgs
		};
	}

	static reset() {
		return {
			type: ActionType.RESET
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

export enum ActionType {
	PRELOAD = '[Preloader] preloading'
}

export class PreloaderActions {
	static preload() {
		return { type: ActionType.PRELOAD };
	}
}

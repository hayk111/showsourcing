

export enum ActionType {
	LOAD = '[Preloader] loading'
}

export class PreloaderActions {
	static load(teamId) {
		return {
			type: ActionType.LOAD,
			payload: teamId
		};
	}
}

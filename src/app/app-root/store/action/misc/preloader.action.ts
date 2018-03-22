export const actionType = {
	LOAD: '[Preloader] loading',
};

export class PreloaderActions {
	static load(teamId) {
		return {
			type: actionType.LOAD,
			payload: teamId,
		};
	}
}

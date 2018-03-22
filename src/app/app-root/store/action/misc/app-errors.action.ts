export const actionType = {
	ADD: '[Error] Add',
};

export class AppErrorActions {
	static add(e: Error) {
		return {
			type: actionType.ADD,
			payload: e,
		};
	}
}

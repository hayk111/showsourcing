
export enum ActionType {
	ADD = '[Error] Add',
}

export class AppErrorActions {
	static add(e: Error) {
		return {
			type: ActionType.ADD,
			payload: e
		};
	}

}

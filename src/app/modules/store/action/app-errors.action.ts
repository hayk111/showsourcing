
export enum ActionType {
	ADD_ERROR = '[Error] Add',
	REMOVE_ERROR = '[Error] Remove'
}

export class AppErrorActions {
	static add(message: string) {
		return {
			type: ActionType.ADD_ERROR,
			payload: { message }
		};
	}

	static remove(id: number) {
		return {
			type: ActionType.REMOVE_ERROR,
			payload: id
		};
	}
}

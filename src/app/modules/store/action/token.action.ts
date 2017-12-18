
export enum ActionType {
	SET = '[Token] Setting',
	CHECK = '[Token] Checking',
	REMOVE = '[Token] Removing'
}

export class TokenActions {
	static setToken(token: string) {
		return {
			type: ActionType.SET,
			payload: token
		};
	}

	static check() {
		return {
			type: ActionType.CHECK,
		};
	}

	static remove() {
		return {
			type: ActionType.REMOVE
		};
	}
}

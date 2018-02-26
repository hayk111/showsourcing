
export enum TokenActionType {
	SET = '[Token] Setting',
	CHECK = '[Token] Checking',
	REMOVE = '[Token] Removing'
}

export class TokenActions {
	static setToken(token: string) {
		return {
			type: TokenActionType.SET,
			payload: token
		};
	}

	static check() {
		return {
			type: TokenActionType.CHECK,
		};
	}

	static remove() {
		return {
			type: TokenActionType.REMOVE
		};
	}
}

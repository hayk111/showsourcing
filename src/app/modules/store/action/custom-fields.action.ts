

export enum ActionType {
	SET = '[CustomFields] setting',
}

export class CustomFieldsActions {
	static set(payload) {
		return {
			type: ActionType.SET,
			payload
		};
	}
}

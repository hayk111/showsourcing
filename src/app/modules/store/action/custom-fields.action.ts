import { EntityTarget } from '../utils/entities.utils';



export enum ActionType {
	LOAD = '[CustomFields] loading',
	SET = '[CustomFields] setting',
	PATCH = '[CustomFields] patch',
	// putting delete here as well for convenience
	DELETE = '[CustomFields] delete'
}

export class CustomFieldsActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static set(payload) {
		return {
			type: ActionType.SET,
			payload
		};
	}

	static patch(target: EntityTarget, propName: string, value: any) {
		return {
			type: ActionType.PATCH,
			payload: { target, propName, value }
		};
	}

	static delete(target: EntityTarget) {
		return {
			type: ActionType.DELETE,
			payload: target
		};
	}
}

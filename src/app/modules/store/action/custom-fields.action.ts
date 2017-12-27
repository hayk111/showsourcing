import { EntityTarget } from '../utils/entities.utils';



export enum ActionType {
	SET = '[CustomFields] setting',
	PATCH = '[CustomFields] patch'
}

export class CustomFieldsActions {

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
}

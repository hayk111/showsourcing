import { EntityTarget } from '../../utils/entities.utils';



export enum ActionType {
	LOAD = '[CustomFields] loading',
	ADD = '[CustomFields] setting',
}

export class CustomFieldsActions {

	static load(id: string, maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: { id, maxCounter }
		};
	}

	static add(payload) {
		return {
			type: ActionType.ADD,
			payload
		};
	}

}

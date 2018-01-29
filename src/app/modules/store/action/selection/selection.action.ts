import { EntityTarget } from '../../utils/entities.utils';

export enum ActionType {
	SELECT = '[Selection] selecting',
}

export class SelectionAction {
	static select(target: EntityTarget) {
		return {
			type: ActionType.SELECT,
			payload: target
		};
	}
}

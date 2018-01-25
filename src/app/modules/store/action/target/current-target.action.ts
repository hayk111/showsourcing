import { EntityTarget } from '../../utils/entities.utils';

// when an item is selected ( a product page is opened etc. )

export enum ActionType {
	SET = '[CurrentTarget] setting target'
}

export class CurrentTargetAction {
	static set(target: EntityTarget) {
		return {
			type: ActionType.SET,
			payload: target
		};
	}
}

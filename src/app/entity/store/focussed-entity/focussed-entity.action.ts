import { EntityTarget } from '../entity.model';

export const focussedEntityActionType = {
	FOCUS: '[FocussedEntity] focussing',
};

export const focussedEntityAction = {
	focus: (target: EntityTarget) => {
		return {
			type: focussedEntityActionType.FOCUS,
			payload: target,
		};
	}
};


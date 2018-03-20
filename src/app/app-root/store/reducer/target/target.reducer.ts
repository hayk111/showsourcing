import { entityInitialState, ERM } from '~app/shared/entity/models';
import { addEntities, removeEntities, replaceEntity } from '~entity';
import { TypedAction } from '~utils';

import { ActionType } from '../../action/target/target.action';

const initialState = {
	[ERM.product.entityName]: undefined,
	[ERM.suppliers.entityName]: undefined,
	[ERM.events.entityName]: undefined,
};

// when an entity is selected
export function currentTargetReducer(state = {}, action) {
	switch (action.type) {
		case ActionType.SELECT:
			return action.payload;
		default:
			return state;
	}
}

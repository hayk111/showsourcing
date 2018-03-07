import { entityInitialState, ERM } from '~app/shared/entity/models';
import { addEntities, removeEntities, replaceEntity } from '~store';
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

// reducer that applies to every entity in target
export function targetReducerFactory(actionType) {
	return function(state = entityInitialState, action: TypedAction<any>) {
		switch (action.type) {
			case actionType['SET']:
				return addEntities(state, action.payload);

			case actionType['ADD']:
				return addEntities(state, [action.payload]);

			// we also reset on load because it means we switched the target entity
			case actionType['LOAD']:
				return entityInitialState;

			case actionType['REPLACE']:
				return replaceEntity(state, action.payload.old, action.payload.replacing);

			case actionType['REMOVE']:
				return removeEntities(state, [action.payload.id]);

			default:
				return state;
		}
	};
}

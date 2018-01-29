import { ActionType } from '../../action/selection/selection.action';
import { entityRepresentationMap, EntityTarget, EntityRepresentation, entityInitialState, addEntities, replaceEntity } from '../../utils/entities.utils';
import { TypedAction } from '../../utils/typed-action.interface';

const initialState = {
	[entityRepresentationMap.product.entityName]: undefined,
	[entityRepresentationMap.suppliers.entityName]: undefined,
	[entityRepresentationMap.events.entityName]: undefined,
};

// when an entity is selected
export function currentSelectionReducer(state, action) {

	switch (action.type) {
		case ActionType.SELECT:
			return action.payload;
		default:
			return state;
	}
}

// reducer that applies to every entity in selection
export function selectionReducerFactory(actionType) {
	return function (state = entityInitialState, action: TypedAction<any>) {
		switch (action.type) {
			case actionType['ADD']:
				return addEntities(state, action.payload);
			case actionType['RESET']:
				return entityInitialState;
			case actionType['REPLACE']:
				return replaceEntity(state, action.payload.old, action.payload.replacing);
			default: return state;
		}
	};
}

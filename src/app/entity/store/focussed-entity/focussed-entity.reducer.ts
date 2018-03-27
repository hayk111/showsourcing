import { focussedEntityActionType as actionType } from './focussed-entity.action';

const initialState = undefined;

// when an entity is selected
export function focussedEntityReducer(state = {}, action) {
	switch (action.type) {
		case actionType.FOCUS:
			return action.payload;
		default:
			return state;
	}
}

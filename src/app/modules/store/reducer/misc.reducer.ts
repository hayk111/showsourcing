import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/misc.action';
import { EntityRepresentation } from '../utils/entities.utils';

export const initialState = {
	filterPanel: { open: false },
	filterSelectionPanel: { open: false, target: undefined as EntityRepresentation }
};


export function miscReducer(state = initialState, action: TypedAction<any> ): any {
	switch (action.type) {
		case ActionType.SET_PROPERTY:
			const newState = { ...state };
			const target = action.payload.target;
			const prop = action.payload.property;
			const value = action.payload.value;
			newState[target][prop] = value;
			return newState;
		default: return state;
	}
}

import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/panel.action';

export const initialState = {
	filtersPanel: { open: false }
};


export function panelReducer(state = initialState, action: TypedAction<any> ): any {
	switch (action.type) {
		case ActionType.SET_PROPERTY:
			const newState = { ...state };
			const panel = action.payload.panel;
			const prop = action.payload.property;
			const value = action.payload.value;
			newState[panel][prop] = value;
			return newState;
		default: return state;
	}
}

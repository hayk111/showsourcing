import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/filter-selection-panel.action';




export const initialState = {
	open: false,
	target: undefined
};

export function filterSelectionPanelReducer(state = initialState,
																		action: TypedAction<any>) {
	switch (action.type) {
		case ActionType.OPEN_TARGET:
			return {
				open: true,
				target: action.payload
			};
		case ActionType.CLOSE:
			return initialState;
		default:
			return state;
	}
}

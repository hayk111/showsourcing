import { ActionType } from '../action/selection/selection.action';



export function selectionReducer(state, action) {
	switch (action.type) {
		case ActionType.SET:
			return action.payload;
		default: return state;
	}
}

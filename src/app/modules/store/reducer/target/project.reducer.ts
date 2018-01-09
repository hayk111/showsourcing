import { ActionType } from '../../action/target/project.action';




const initialState = [];

export function targetProjectReducer(state = initialState, action) {

	switch (action.type) {
		case ActionType.SET:
			return action.payload;
		default: return state;
	}
}

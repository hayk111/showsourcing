import { ActionType } from '../../action/target/tag.action';



const initialState = [];

export function targetTagReducer(state = initialState, action) {

	switch (action.type) {
		case ActionType.SET:
			return action.payload;
		default: return state;
	}
}

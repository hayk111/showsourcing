import { ActionType } from '../../action/target/tag.action';



const initialState = [];

export function targetTagReducer(state = initialState, action) {

	switch (action.type) {

		case ActionType.SET:
			return action.payload;

		case ActionType.ADD:
			return state.concat(action.payload.tag.id);

		case ActionType.REMOVE:
			const id = action.payload.tag.id;
			return state.filter(anId => anId !== id);

		default: return state;
	}
}

import { ActionType } from '../../action/target/project.action';




const initialState = [];

export function targetProjectReducer(state = initialState, action) {

	switch (action.type) {

		case ActionType.SET:
			return action.payload;

		case ActionType.ADD:
			return state.concat(action.payload.project.id);

		case ActionType.REMOVE:
			const id = action.payload.project.id;
			return state.filter(anId => anId !== id);
		default: return state;
	}
}

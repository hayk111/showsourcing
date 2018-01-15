import { ActionType } from '../../action/target/tag.action';



const initialState = {
	tags:  [],
	pending: false,
};

export function targetTagReducer(state = initialState, action) {

	switch (action.type) {

		case ActionType.SET:
			return { tags: action.payload, pending: false };

		case ActionType.ADD:
			return { tags: state.tags.concat(action.payload.tag.id) };

		case ActionType.REMOVE:
			const id = action.payload.tag.id;
			return { tags: state.tags.filter(anId => anId !== id) };

		case ActionType.SET_PENDING:
			return { ...state, pending: true };

		default: return state;
	}
}

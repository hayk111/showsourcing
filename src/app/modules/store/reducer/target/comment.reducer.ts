import { AppComment } from '../../model/comment.model';
import { ActionType } from '../../action/comment.action';


const initialState = [];

export function commentReducer(state = initialState, action) {
	let newState;

	switch (action.type) {
		case ActionType.SET:
			// when we set we have to keep the pending comments,
			// so when we open another product, then switch back to the original one
			// if the pending comment is still pending it should display as pending
			newState = state.filter((c: AppComment) => c.pending);
			newState.push(...action.payload);
			return newState;

		case ActionType.ADD_PENDING:
			const comment: AppComment = action.payload;
			return state.concat(comment);

		case ActionType.SET_READY:
			const id = action.payload.id;
			const replacing = action.payload.replacing;
			const index = state.findIndex(f => f.id === id);
			newState = [...state];
			newState[index] = replacing;
			return newState;

		case ActionType.CLEAR:
			return initialState;
		default: return state;
	}
}

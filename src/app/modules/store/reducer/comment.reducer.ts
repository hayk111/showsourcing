import { AppComment } from '../model/comment.model';
import { ActionType } from '../action/comment.action';


const initialState = [];

export function commentReducer(state = initialState, action) {
	switch (action.type) {
		case ActionType.SET:
			// when we set we have to keep the pending comments,
			// so when we open another product, then switch back to the original one
			// if the pending comment is still pending it should display as pending
			const newState = state.filter((c: AppComment) => c.pending);
			newState.push(...action.payload);
			return newState;
		case ActionType.CLEAR:
			return initialState;
		default: return state;
	}
}

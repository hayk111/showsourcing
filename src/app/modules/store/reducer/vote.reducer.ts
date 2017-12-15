import { ActionType } from '../action/vote.action';
import { Vote } from '../model/vote.model';


const initialState = [];

export function voteReducer(state = initialState, action) {

	switch (action.type) {
		case ActionType.SET:
			return action.payload;

		case ActionType.ADD_PENDING:
			const vote: Vote = action.payload;
			const indexPrev = state.findIndex(v => v.userId === vote.userId);
			if (indexPrev >= 0) {
				const newState = [...state];
				newState[indexPrev] = vote;
				return newState;
			} else {
				return state.concat(vote);
			}
		case ActionType.CLEAR:
			return initialState;
		default: return state;
	}
}

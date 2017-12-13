import { ActionType } from '../action/app-file.action';
import { AppFile } from '../model/app-file.model';


const initialState = [];

export function filesReducer(state = initialState, action) {
	switch (action.type) {
		case ActionType.ADD:
			// when we set we have to keep the pending files,
			// so when we open another product, then switch back to the original one
			// if the pending file is still pending it should display as pending
			const newState = state.filter((f: AppFile) => f.pending);
			newState.push(...action.payload);
			return newState;
		default: return state;
	}
}

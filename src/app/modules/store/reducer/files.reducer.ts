import { ActionType } from '../action/app-file.action';
import { AppFile } from '../model/app-file.model';
import { uuid } from '../utils/uuid.utils';


const initialState = [];

export function filesReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ActionType.SET:
			// when we set we have to keep the pending files,
			// so when we open another product, then switch back to the original one
			// if the pending file is still pending it should display as pending
			newState = state.filter((f: AppFile) => f.pending);
			newState.push(...action.payload);
			return newState;
		case ActionType.ADD_PENDING:
			return state.concat(action.payload);
		case ActionType.SET_READY:
			const id = action.payload.id;
			const replacing = action.payload.replacing;
			const index = state.findIndex(f => f.id === id);
			newState = [...state];
			newState[index] = replacing;
			return newState;
		default: return state;
	}
}

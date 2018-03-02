import { TypedAction } from '~utils';
import { ActionType } from '../actions/dialog.action';

export function dialogReducer(state = {}, action: TypedAction<any>) {
	switch (action.type) {
		case ActionType.REGISTER:
			return { ...state, [action.payload]: { open: false } };
		case ActionType.OPEN:
			return { ...state, [action.payload]: { open: true } };
		case ActionType.CLOSE:
			return { ...state, [action.payload]: { open: false } };
		case ActionType.SET_METADATA:
			const name = action.payload.name;
			const metadata = action.payload.metadata;
			return { ...state, [name]: { ...state[name], metadata } };
		default:
			return state;
	}
}

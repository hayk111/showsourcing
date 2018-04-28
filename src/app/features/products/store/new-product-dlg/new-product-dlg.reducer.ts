import { NewProductDlgActionType as ActionType } from './new-product-dlg.actions';

export interface State {
	pending: boolean;
}

const initialState = {
	pending: false
};

export function reducer(state: State = initialState, action) {
	switch (action.type) {
		case ActionType.CREATE_PRODUCT:
			return { ...state, pending: true };
		case ActionType.SET_READY:
			return { ...state, pending: false };
		default:
			return state;
	}
}


export const selectPending = (state: State) => state.pending;



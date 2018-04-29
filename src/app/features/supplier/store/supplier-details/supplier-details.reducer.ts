import { SupplierDetailActionType } from './supplier-details.action';

export interface State {
	focused: string;
}

export const initialState: State = {
	focused: null
};

export function reducer(state: State = initialState, action): State {
	switch (action.type) {
		case SupplierDetailActionType.FOCUS:
			return { ...state, focused: action.payload };
		default:
			return state;
	}
}

export const selectFocused = (state: State) => state.focused;

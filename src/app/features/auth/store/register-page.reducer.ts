import { AuthActionType } from './authentication.action';

export interface State {
	error: string | null;
	pending: boolean;
}

export const initialState: State = {
	error: null,
	pending: false,
};

export function reducer(state = initialState, action: any): State {
	switch (action.type) {
		case AuthActionType.REGISTER: {
			return {
				...state,
				error: null,
				pending: true,
			};
		}

		case AuthActionType.REGISTER_SUCCESS: {
			return {
				...state,
				error: null,
				pending: false,
			};
		}

		case AuthActionType.REGISTER_ERROR: {
			return {
				...state,
				error: action.payload,
				pending: false,
			};
		}

		default: {
			return state;
		}
	}
}

export const selectError = (state: State) => state.error;
export const selectPending = (state: State) => state.pending;

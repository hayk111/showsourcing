import { TypedAction } from '~utils';
import { AuthActionType } from './authentication.action';

export interface State {
	pending: boolean;
	authenticated: boolean;
}

export const initialState: State = {
	pending: true,
	authenticated: false,
};

export function reducer(state: State = initialState, action: TypedAction<any>): State {

	switch (action.type) {
		case AuthActionType.CHECK_ALREADY_AUTHENTICATED_SUCCESS:
		case AuthActionType.LOGIN_SUCCESS:
			return { authenticated: true, pending: false };

		case AuthActionType.LOGOUT:
			return { authenticated: false, pending: false };

		default:
			return state;
	}
}


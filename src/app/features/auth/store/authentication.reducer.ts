import { TypedAction } from '~utils';
import { AuthActionType, AuthActions } from './authentication.action';

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
		case AuthActionType.REGISTER_SUCCESS:
			return { authenticated: true, pending: false };

		case AuthActionType.CHECK_ALREADY_AUTHENTICATED_ERROR:
		case AuthActionType.LOGOUT:
		case AuthActionType.REGISTER_ERROR:
			return { authenticated: false, pending: false };

		default:
			return state;
	}
}


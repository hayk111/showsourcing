import { Authentication } from '~auth/models';
import { TypedAction } from '~utils';
import { AuthActionType } from '~auth/store/actions';


// authentication has 3 states: null, false, true
// null is before when we don't know yet.

export const initialState: Authentication = {
	pending: false,
	// It's important that the authenticated state here is null at the start. NULL, Not undefined.
	authenticated: true,
	errorMsg: ''
};

export function authenticationReducer(state: Authentication = initialState, action: TypedAction<any> ): Authentication {

	switch (action.type) {

		case AuthActionType.AUTHENTICATE:
			return { ...state, authenticated: true };

		case AuthActionType.LOGOUT:
			return { ...state, authenticated: false };

		default:
			return state;
	}
}

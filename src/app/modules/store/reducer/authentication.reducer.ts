import { Authentication } from '../model/authentication.model';
import { TypedAction } from '../utils/typed-action.interface';
import { ActionType } from '../action/authentication.action';


// authentication has 3 states: null, false, true
// null is before when we don't know yet.

export const initialState: Authentication = {
	pending: false,
	// It's important that the authenticated state here is null at the start. NULL, Not undefined.
	authenticated: null,
	errorMsg: ''
};

export function authenticationReducer(state: Authentication = initialState, action: TypedAction<any> ): Authentication {
	switch (action.type) {
		case ActionType.SET_PENDING:
			return { ...state, pending: action.payload as boolean};
		case ActionType.AUTHENTICATE:
			return { ...state, authenticated: true, pending: false, errorMsg: '' };
		case ActionType.SET_ERROR:
			return { ...state, pending: false, errorMsg: action.payload as string };
		case ActionType.LOGOUT:
			return { ...state, authenticated: false, pending: false, errorMsg: '' };
		default:
			return state;
	}
}

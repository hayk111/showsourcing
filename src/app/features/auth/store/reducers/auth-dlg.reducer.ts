import { AuthDlgActionType } from '~auth/store/actions';
import { AuthView } from '~auth/models';




const initialState = {
	view: AuthView.LOGIN,
	loginError: undefined,
	registerError: undefined,
	forgotPwError: undefined,
	loginPending: false,
	registerPending: false,
	forgotPwPending: false
};

export function authDlgReducer(state = initialState, action) {
	let view;

	if (action.payload && action.payload.view !== undefined)
		view = action.payload.view;
	switch (action.type) {

		case AuthDlgActionType.SET_VIEW:
			return { ...state, view };

		case AuthDlgActionType.SET_ERROR:
			return setViewError(view, state, action.payload.error);

		case AuthDlgActionType.SET_PENDING:
			return setViewPending(view, state, true);

		case AuthDlgActionType.SET_READY:
			return setViewPending(view, state, false);

		default: return state;
	}
}


function setViewPending(view: AuthView, state, isPending: boolean) {
	switch (view) {
		case AuthView.LOGIN:
			return {...state, loginPending: isPending };
		case AuthView.REGISTER:
			return {...state, registerPending: isPending };
		case AuthView.FORGOT_PASSWORD:
			return {...state, forgotPwPending: isPending };
		default: return state;
	}
}


function setViewError(view: AuthView, state, error: any) {
	switch (view) {
		case AuthView.LOGIN:
			return {...state, loginError: error };
		case AuthView.REGISTER:
			return {...state, registerError: error };
		case AuthView.FORGOT_PASSWORD:
			return {...state, forgotPwError: error };
		default: return state;
	}
}


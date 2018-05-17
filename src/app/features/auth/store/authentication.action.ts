import { TypedAction } from '~utils';
import { User } from '~models';
import { Credentials } from '../interfaces';

export enum AuthActionType {
	LOGIN = '[Authentication] login',
	LOGIN_SUCCESS = '[Authentication] login success',
	LOGIN_ERROR = '[Authentication] login error',

	LOGOUT = '[Authentication] logging out',

	CHECK_ALREADY_AUTHENTICATED = '[Authentication] checking if user is already authenticated',
	CHECK_ALREADY_AUTHENTICATED_SUCCESS = '[Authentication] user is already authenticated',
	CHECK_ALREADY_AUTHENTICATED_ERROR = '[Authentication] user is NOT already authenticated',

	REGISTER = '[Authentication] register',
	REGISTER_SUCCESS = '[Authentication] register success',
	REGISTER_ERROR = '[Authentication] register error',

	RESET_PASSWORD = '[Authentication] reset password',
	RESET_PASSWORD_SUCCESS = '[Authentication] reset password success',
	RESET_PASSWORD_ERROR = '[Authentication] reset password error'
}

export class AuthActions {

	static login(credentials: { identifier: string, password: string }) {
		return {
			type: AuthActionType.LOGIN,
			payload: credentials
		};
	}

	static loginSuccess(user: User) {
		return {
			type: AuthActionType.LOGIN_SUCCESS,
		};
	}

	static loginError(error) {
		return {
			type: AuthActionType.LOGIN_ERROR,
			payload: error
		};
	}

	// on page refresh a token might be saved to reauthenticate the user
	static checkAuthenticated() {
		return {
			type: AuthActionType.CHECK_ALREADY_AUTHENTICATED,
		};
	}

	// on page refresh a token might be saved to reauthenticate the user
	static checkAuthenticatedSuccess(user: User) {
		return {
			type: AuthActionType.CHECK_ALREADY_AUTHENTICATED_SUCCESS,
			payload: user
		};
	}

	// on page refresh a token might be saved to reauthenticate the user
	static checkAuthenticatedError(user: User) {
		return {
			type: AuthActionType.CHECK_ALREADY_AUTHENTICATED_ERROR,
			payload: user
		};
	}

	static register(creds: Credentials) {
		return {
			type: AuthActionType.REGISTER,
			payload: creds
		};
	}

	static registerSuccess(user: User) {
		return {
			type: AuthActionType.REGISTER_SUCCESS,
			payload: user
		};
	}

	static registerError(error: any) {
		return {
			type: AuthActionType.REGISTER_ERROR,
			payload: error
		};
	}

	static logout() {
		return {
			type: AuthActionType.LOGOUT
		};
	}

	static resetPassword(email: string) {
		return {
			type: AuthActionType.RESET_PASSWORD,
			payload: email
		};
	}

	static resetPasswordSuccess() {
		return {
			type: AuthActionType.RESET_PASSWORD_SUCCESS,
		};
	}

	static resetPasswordError(error: any) {
		return {
			type: AuthActionType.RESET_PASSWORD_ERROR,
			payload: error
		};
	}
}

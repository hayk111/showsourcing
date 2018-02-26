import { TypedAction } from '~store/utils/typed-action.interface';

export enum AuthActionType {
	LOGIN = '[Authentication] login',
	REGISTER = '[Authentication] register',
	AUTHENTICATE = '[Authentication] authenticating',
	LOGOUT = '[Authentication] logging out',
	RESET_PASSWORD = '[Authentication] reset password'
}

export class AuthActions {


	static login(credentials: { identifier: string, password: string }) {
		return {
			type: AuthActionType.LOGIN,
			payload: credentials
		};
	}

	static register(creds) {
		return {
			type: AuthActionType.REGISTER,
			payload: creds
		};
	}

	static authenticate(token: string, redirect): TypedAction<any> {
		return {
			type: AuthActionType.AUTHENTICATE,
			payload: { token, redirect }
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
}

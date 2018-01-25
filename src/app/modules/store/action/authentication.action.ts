import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOGIN = '[Authentication] login',
	REGISTER = '[Authentication] register',
	AUTHENTICATE = '[Authentication] authenticating',
	LOGOUT = '[Authentication] logging out',
	RESET_PASSWORD = '[Authentication] reset password'
}

export class AuthActions {


	static login(credentials: { identifier: string, password: string }) {
		return {
			type: ActionType.LOGIN,
			payload: credentials
		};
	}

	static register(creds) {
		return {
			type: ActionType.REGISTER,
			payload: creds
		};
	}

	static authenticate(token: string, redirect): TypedAction<any> {
			return {
					type: ActionType.AUTHENTICATE,
					payload: { token, redirect }
			};
	}

	static logout() {
		return {
			type: ActionType.LOGOUT
		};
	}

	static resetPassword(email: string) {
		return {
			type: ActionType.RESET_PASSWORD,
			payload: email
		};
	}
}

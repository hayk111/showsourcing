import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOGIN = '[Authentication] login',
	REGISTER = '[Authentication] register',
	SET_PENDING = '[Authentication] setting pending',
	AUTHENTICATE = '[Authentication] authenticating',
	LOGOUT = '[Authentication] logging out',
	SET_ERROR = '[Authentication] setting error',
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

	static setPending(payload: boolean): TypedAction<boolean> {
			return {
					type: ActionType.SET_PENDING,
					payload
			};
	}

	static authenticate(token: string, redirect): TypedAction<any> {
			return {
					type: ActionType.AUTHENTICATE,
					payload: { token, redirect }
			};
	}

	static setError(payload: string): TypedAction<string> {
			return {
					type: ActionType.SET_ERROR,
					payload
			};
	}

	static logout() {
		return {
			type: ActionType.LOGOUT
		};
	}
}

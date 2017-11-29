import { Action } from '@ngrx/store';
import { User } from '../model/user.model';
import { TypedAction } from '../utils/typed-action.interface';

export enum ActionType {
	LOGIN = '[Authentication] login',
	SET_PENDING = '[Authentication] setting pending',
	SET_AUTHENTICATED = '[Authentication] setting authenticated',
	SET_ERROR = '[Authentication] setting error',
	SET_TOKEN = '[Authentication] setting token',
}

export class AuthActions {
		static setPending(payload: boolean): TypedAction<boolean> {
				return {
						type: ActionType.SET_PENDING,
						payload
				};
		}

		static setAuthenticated(payload: boolean): TypedAction<boolean> {
				return {
						type: ActionType.SET_AUTHENTICATED,
						payload
				};
		}

		static setError(payload: string): TypedAction<string> {
				return {
						type: ActionType.SET_ERROR,
						payload
				};
		}

		static setToken(payload: string): TypedAction<string> {
			return {
					type: ActionType.SET_ERROR,
					payload
			};
		}
}

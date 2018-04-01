import { Action } from '@ngrx/store';
import { TypedAction } from '~utils';
import { User } from '~user';

export enum ActionType {
	SET_USER = '[User] setting',
	RESET_USER = '[User] resetting',
}

export class UserActions {

	static setUser(payload: User): TypedAction<User> {
		return {
			type: ActionType.SET_USER,
			payload
		};
	}

	static resetUser(): Action {
		return {
			type: ActionType.RESET_USER
		};
	}
}
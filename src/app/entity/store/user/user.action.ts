import { Action } from '@ngrx/store';
import { TypedAction } from '~utils';
import { User } from '~models';
import { Patch } from '~app/entity/utils/patch.interface';

export enum ActionType {
	SET_USER = '[User] setting',
	RESET_USER = '[User] resetting',
	PATCH = '[User] patching',
	UPLOAD_IMG = '[User] uploading image',
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

	static patch(patch: Patch) {
		return {
			type: ActionType.PATCH,
			payload: patch
		};
	}
}

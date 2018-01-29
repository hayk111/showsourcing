import { Action } from '@ngrx/store';
import { TypedAction } from '../../utils/typed-action.interface';
import { Team } from '../../model/entities/team.model';
import { User } from '../../model/entities/user.model';

export enum ActionType {
	LOAD = '[Team] Loading',
	ADD = '[Team] setting',
}

export class TeamActions {
	static load(maxCounter: number) {
		return {
			type: ActionType.LOAD,
			payload: maxCounter
		};
	}

	static add(payload: Array<Team>): TypedAction<Array<Team>> {
		return {
			type: ActionType.ADD,
			payload
		};
	}

}
